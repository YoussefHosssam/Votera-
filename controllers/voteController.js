const CustomError = require("../utils/customError");
const asyncHandler = require("express-async-handler");
const Poll = require("../models/poll");
const getUserID = require("../utils/getUserID");
const Vote = require("../models/vote");

exports.vote = asyncHandler(async (req, res, next) => {
    const options = req.body.options;
    if (!options || !Array.isArray(options) || options.length === 0) {
        return next(new CustomError("Options are required and must be a non-empty array", 400));
    }

    const poll = await Poll.findById(req.params.id);
    if (!poll) {
        return next(new CustomError("Poll not found", 404));
    }

    // Check that all options exist in poll.options Map keys
    const pollOptionKeys = Array.from(poll.options.keys());
    const allOptionsExist = options.every(option => pollOptionKeys.includes(option));
    if (!allOptionsExist) {
        return next(new CustomError("One or more options do not exist in the poll", 400));
    }

    // Get user ID properly (assuming getUserID returns user ID synchronously)
    const user_id = getUserID(req, res, next);

    // Create the vote document
    const vote = await Vote.create({
        user_id,
        poll_id: poll._id,
        options
    });

    // Update vote counts in the poll.options Map
    options.forEach(option => {
        const currentVotes = poll.options.get(option) || 0;
        poll.options.set(option, currentVotes + 1);
    });
    poll.number_of_votes += 1;

    await poll.save();

    res.status(201).json({
        status: 'success',
        vote
    });
});


exports.deleteVote = asyncHandler(async (req, res, next) => {
    const pollId = req.params.id;
    const voteId = req.params.vid;

    if (!pollId || !voteId) {
        return next(new CustomError("Poll or vote not found", 404));
    }

    const poll = await Poll.findById(pollId);
    if (!poll) {
        return next(new CustomError("Poll not found", 404));
    }

    const vote = await Vote.findById(voteId);
    if (!vote) {
        return next(new CustomError("Vote not found", 404));
    }

    // Decrement the counts for the options voted in this vote
    const options = vote.options; // Assuming vote.options is an array of strings
    options.forEach(option => {
        const currentCount = poll.options.get(option) || 0;
        const newCount = currentCount > 0 ? currentCount - 1 : 0;
        poll.options.set(option, newCount);
    });
    poll.number_of_votes -= 1;

    await poll.save();
    await Vote.findByIdAndDelete(voteId);

    res.status(200).json({
        status: 'success',
        message: "Vote deleted successfully"
    });
});

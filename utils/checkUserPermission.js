const CustomError = require("../utils/customError");
const Poll = require("../models/poll");
const Vote = require("../models/vote");
const getUserID = require("./getUserID");
exports.pollPermission = async (req, res, next) => {
    const poll = await Poll.findById(req.params.id);
    if (!poll) {
        return next(new CustomError("Poll not found", 404));
    }
    const id = getUserID(req, res, next);
    if (poll.creator_id.toString() !== id) {
        return next(new CustomError("You are not authorized to access this poll", 403));
    }
    next();
}

exports.votePermission = async (req, res, next) => {
    const vote = await Vote.findById(req.params.vid);
    if (!vote) {
        return next(new CustomError("Vote not found", 404));
    }
    if (vote.user_id.toString() !== req.user.id) {
        return next(new CustomError("You are not authorized to access this vote", 403));
    }
    next();
}

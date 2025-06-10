const Poll = require("../models/poll");
const CustomError = require("../utils/customError");
const asyncHandler = require("express-async-handler");
const getUserID = require("../utils/getUserID");
const { createPollErrorSchema } = require("../validators/pollErrorSchema");

exports.createPoll = asyncHandler(async (req, res, next) => {
    const { title, description , options , expires_at } = req.body;
    const { error } = createPollErrorSchema.validate({ title, description , options , expires_at });
    if (error) {
        return next(new CustomError(error.message, 400));
    }

    const creator_id = getUserID(req, res, next);
    const poll = await Poll.create({ title, description , creator_id , options , expires_at });
    res.status(201).json({
        status: 'success',
        poll
    });
});

exports.getAllPolls = asyncHandler(async (req, res, next) => {
    const page = req.query.page || 1;
    const limit = 5;
    const skip = (page - 1) * limit;
    const polls = await Poll.find().skip(skip).limit(limit);
    res.status(200).json({
        page,
        results: polls.length,
        status: 'success',
        polls
    });
});

exports.getPollById = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const poll = await Poll.findById(id);
    if (!poll) {
        return next(new CustomError("Poll not found", 404));
    }
    res.status(200).json({
        status: 'success',
        poll
    });
});

exports.updatePoll = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const { title, description , expires_at } = req.body;
    const poll = await Poll.findByIdAndUpdate(id, { title, description , expires_at }, { new: true });
    if (!poll) {
        return next(new CustomError("Poll not found", 404));
    }
    res.status(200).json({
        status: 'success',
        poll
    });
});

exports.deletePoll = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    if (!id) {
        return next(new CustomError("Poll not found", 404));
    }
    const poll = await Poll.findById(id);
    if (!poll) {
        return next(new CustomError("Poll not found", 404));
    }
    await Poll.findByIdAndDelete(id);
    res.status(200).json({
        status: 'success',
        message: "Poll deleted successfully"
    });
});
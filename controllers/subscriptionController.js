const Subscription = require("../models/Subscription");
const CustomError = require("../utils/customError");
const asyncHandler = require("express-async-handler");
const getUserID = require("../utils/getUserID");

exports.subscribeToPoll = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const user_id = getUserID(req, res, next);
    const subscription = await Subscription.create({
        user_id,
        poll_id: id
    });
    res.status(201).json({
        status: 'success',
        subscription
    });
});
exports.unsubscribeFromPoll = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const user_id = getUserID(req, res, next);
    await Subscription.findOneAndDelete({
        user_id,
        poll_id: id
    });
    res.status(200).json({
        status: 'success',
        message: "Unsubscribed from poll"
    });
});



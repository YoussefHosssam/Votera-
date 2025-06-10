const User = require('../models/user');
const CustomError = require('../utils/customError');
const getUserID = require('../utils/getUserID');
const asyncHandler = require('express-async-handler');

exports.addFriend = asyncHandler(async (req, res, next) => {
    const { id } = req.params; // ID of the user to be added as friend
    const user_id = getUserID(req, res, next); // Authenticated user (sender)
  
    const sender = await User.findById(user_id);
    const receiver = await User.findById(id);
  
    if (!receiver) {
      return next(new CustomError('User not found', 404));
    }
  
    // Already friends
    if (sender.friends.includes(receiver._id)) {
      return next(new CustomError('User is already your friend', 400));
    }
  
    // Already sent a request
    if (receiver.friend_requests.includes(sender._id)) {
      return next(new CustomError('Friend request already sent', 400));
    }
  
    // Add the request to the RECEIVER's friendRequests
    receiver.friend_requests.push(sender._id);
    await receiver.save();
  
    res.status(200).json({
      status: 'success',
      message: 'Friend request sent'
    });
  });
  
exports.getFriendRequests = asyncHandler(async (req, res, next) => {
  const user_id = getUserID(req , res , next);
  const requests = await User.findById(user_id).select('friend_requests');
  res.status(200).json({
    status: 'success',
    requests: requests.friend_requests
  });
});

exports.acceptFriendRequest = asyncHandler(async (req, res, next) => {
    const id = req.params.id;  // sender id
    const receiver_id = getUserID(req, res, next);
    const receiver = await User.findById(receiver_id);
    // Check if sender's id is in receiver's friend_requests first
    if (!receiver.friend_requests.includes(id)) {
      return next(new CustomError('Friend request not found', 404));
    }
  
    const sender = await User.findById(id);
    if (!sender) {
      return next(new CustomError('Sender not found', 404));
    }
  
    // Remove sender id from receiver's friend_requests
    receiver.friend_requests.pull(sender._id);
  
    // Add each other as friends
    receiver.friends.push(sender._id);
    sender.friends.push(receiver._id);
  
    await receiver.save();
    await sender.save();
  
    res.status(200).json({
      status: 'success',
      message: 'Friend request accepted'
    });
  });
  

exports.rejectFriendRequest = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const receiver_id = getUserID(req , res , next);
  const receiver = await User.findById(receiver_id);
  const sender = await User.findById(id);

  if (!sender) {
    return next(new CustomError('Friend request not found', 404));
  }
  if (!receiver.friend_requests.includes(sender._id)) {
    return next(new CustomError('Friend request not found', 404));
  }
  receiver.friend_requests.pull(sender._id);
  await receiver.save();
  res.status(200).json({
    status: 'success',
    message: 'Friend request rejected'
  });
});

exports.getFriends = asyncHandler(async (req, res, next) => {
  const user_id = getUserID(req , res , next);
  const friends = await User.findById(user_id).select('friends');
  const friendList = await User.find({ _id: { $in: friends.friends } }).select('name');
  res.status(200).json({
    status: 'success',
    friends: friendList
  });
});

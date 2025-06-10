const Poll = require("../models/poll");
const CustomError = require("../utils/customError");
const asyncHandler = require("express-async-handler");


exports.addPollOption = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const options = req.body.options;
  
    if (!id) {
      return next(new CustomError("Poll not found", 404));
    }
  
    if (!options || !Array.isArray(options) || options.length === 0) {
      return next(new CustomError("Options are required", 400));
    }
  
    const poll = await Poll.findById(id);
    if (!poll) {
      return next(new CustomError("Poll not found", 404));
    }
  
    for (const option of options) {
      if (!poll.options.has(option)) {
        poll.options.set(option, 0);
      }
    }
  
    await poll.save();
  
    res.status(200).json({
      status: 'success',
      poll
    });
  });
  

  exports.deletePollOption = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const optionsToDelete = req.body.options; // expect: ['Python', 'C++']
  
    if (!id) {
      return next(new CustomError("Poll ID is required", 404));
    }
  
    const poll = await Poll.findById(id);
    if (!poll) {
      return next(new CustomError("Poll not found", 404));
    }
  
    if (!optionsToDelete || !Array.isArray(optionsToDelete)) {
      return next(new CustomError("Options must be a non-empty array", 400));
    }
  
    if (optionsToDelete.length === 0) {
      // Clear all options
      poll.options = new Map(); // or: poll.options.clear();
      await poll.save();
      return res.status(200).json({
        status: 'success',
        message: "All options deleted successfully"
      });
    }
  
    let found = false;
  
    for (const opt of optionsToDelete) {
      if (poll.options.has(opt)) {
        poll.options.delete(opt);
        found = true;
      }
    }
  
    if (!found) {
      return next(new CustomError("None of the specified options were found", 404));
    }
  
    await poll.save();
  
    return res.status(200).json({
      status: 'success',
      message: "Specified options deleted successfully"
    });
  });
  
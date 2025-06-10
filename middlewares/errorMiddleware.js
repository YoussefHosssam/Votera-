const { startSession } = require("../models/user");

const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let status = err.status || 'error';
    let message = err.message || 'Internal Server Error';

    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        statusCode = 400;
        message = 'Invalid ID';
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        statusCode = 400;
        message = 'Duplicate field value entered';
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(err.errors).map(el => el.message).join(', ');
    }

    res.status(statusCode).json({
        status: status,
        message: message,
        stack: err.stack
    });
};

module.exports = errorHandler;
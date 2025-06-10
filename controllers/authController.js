const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const CustomError = require("../utils/customError");
const { signupUserErrorSchema, loginUserErrorSchema } = require("../validators/userErrorSchema");


exports.registerUser = asyncHandler(async (req, res, next) => {
    const { name, email, password , confirmPassword } = req.body;
    const { error } = signupUserErrorSchema.validate({ name, email, password, confirmPassword });
    if (error) {
        return next(new CustomError(error.message, 400));
    }
    const user = await User.create({ name, email, password_hash: password });

    res.status(201).json({
        status: 'success',
        user
    });
});
exports.loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const { error } = loginUserErrorSchema.validate({ email, password });
    if (error) {
        return next(new CustomError(error.message, 400));
    }
    const user = await User.findOne({ email });
    if (!user) {
        return next(new CustomError("Invalid email or password", 401));
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordCorrect) {
        return next(new CustomError("Invalid email or password", 401));
    }
    const token = jwt.sign({ id: user._id , role: 'user'}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: false,
        maxAge: 3600000
    });
    res.status(200).json({
        status: 'success',
});
});

exports.logoutUser = asyncHandler(async (req, res, next) => {
    if (!req.cookies.jwt) {
        return next(new CustomError('user not logged in', 401));
    }
    res.clearCookie('jwt');
    res.status(200).json({ status: 'success' });
});

exports.admin = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const { error } = loginUserErrorSchema.validate({ email, password });
    if (error) {
        return next(new CustomError(error.message, 400));
    }
    const user = await User.findOne({ email });
    if (!user) {
        return next(new CustomError("Invalid email or password", 401));
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordCorrect) {
        return next(new CustomError("Invalid email or password", 401));
    }
    const token = jwt.sign({ id: user._id , role: 'admin'}, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: false,
        maxAge: 3600000
    });
    res.status(200).json({
        status: 'success',
});
});


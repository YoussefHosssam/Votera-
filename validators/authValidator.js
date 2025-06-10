const jwt = require("jsonwebtoken");
const CustomError = require("../utils/customError");
const asyncHandler = require("express-async-handler");

const verifyToken = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.jwt;
    if (!token) return next(new CustomError("Unauthorized, please login to get access", 401));
  
    try {
      const decoded = jwt.verify(token.trim(), process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      return next(new CustomError("Invalid token. Please login again.", 401));
    }
  });
  

const isAdmin = (req, res, next) => {
    const decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') return next(new CustomError("Forbidden", 403));
    next();
};

module.exports = { verifyToken, isAdmin };


const jwt = require("jsonwebtoken");
const CustomError = require("./customError");

const getUserID = (req, res, next) => {
    const token = req.cookies.jwt;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        return next(new CustomError("User not found", 404));
    }
    return decoded.id;
};

module.exports = getUserID;

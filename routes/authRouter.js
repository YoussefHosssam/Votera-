const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logoutUser, admin } = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/admin", admin);

module.exports = router;


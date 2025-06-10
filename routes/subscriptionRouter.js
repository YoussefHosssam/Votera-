const express = require("express");
const router = express.Router();
const { verifyToken } = require("../validators/authValidator");
const { subscribeToPoll, unsubscribeFromPoll } = require("../controllers/subscriptionController");

router
.post("/:id", verifyToken, subscribeToPoll)
.delete("/:id", verifyToken, unsubscribeFromPoll);

module.exports = router;


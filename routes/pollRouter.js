const express = require("express");
const router = express.Router();
const { createPoll, getAllPolls, getPollById, updatePoll, deletePoll} = require("../controllers/pollController");
const { verifyToken, isAdmin } = require("../validators/authValidator");
const { addPollOption, deletePollOption } = require("../controllers/optionController");
const { vote, deleteVote } = require("../controllers/voteController");
const { pollPermission, votePermission } = require("../utils/checkUserPermission");


router.route("/").post(verifyToken, createPoll).get(getAllPolls);
router.route("/:id").get(getPollById).patch(verifyToken, pollPermission, updatePoll).delete(verifyToken, pollPermission, deletePoll);
router.route("/:id/options").post(verifyToken, pollPermission, addPollOption).delete(verifyToken, pollPermission, deletePollOption);
router.route("/:id/votes").post(verifyToken, vote);
router.route("/:id/votes/:vid").delete(verifyToken ,pollPermission, votePermission, deleteVote);
module.exports = router;

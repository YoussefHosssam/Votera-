const express = require('express');
const router = express.Router();
const { verifyToken } = require('../validators/authValidator');
const { addFriend , getFriendRequests , acceptFriendRequest , rejectFriendRequest , getFriends } = require('../controllers/friendController');


router.post('/requests/:id', verifyToken, addFriend);
router.get('/requests', verifyToken, getFriendRequests);
router.post('/requests/accept/:id', verifyToken, acceptFriendRequest);
router.post('/requests/reject/:id', verifyToken, rejectFriendRequest);
router.get('/', verifyToken, getFriends);
module.exports = router;


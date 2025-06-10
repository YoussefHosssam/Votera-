const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invitationSchema = new Schema({
  inviter_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  invitee_email: {
    type: String,
    required: true
  },
  poll_id: {
    type: Schema.Types.ObjectId,
    ref: 'Poll',
    required: true
  },
  invited_at: {
    type: Date,
    default: Date.now
  },
  is_registered: {
    type: Boolean,
    default: false
  },
  invitee_user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Invitation', invitationSchema);
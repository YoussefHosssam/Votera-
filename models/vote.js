const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const voteSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  poll_id: {
    type: Schema.Types.ObjectId,
    ref: 'Poll',
    required: true
  },
  options: {
    type: [String],
    required: true
  },
  voted_at: {
    type: Date,
    default: Date.now
  }
});

// Add compound index to enforce unique vote per user per poll
voteSchema.index({ user_id: 1, poll_id: 1 }, { unique: true });

module.exports = mongoose.model('Vote', voteSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
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
  subscribed_at: {
    type: Date,
    default: Date.now
  }
});

// Add compound index to enforce unique subscription per user per poll
subscriptionSchema.index({ user_id: 1, poll_id: 1 }, { unique: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);
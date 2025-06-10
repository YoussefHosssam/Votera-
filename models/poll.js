const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pollSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  creator_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  is_active: {
    type: Boolean,
    default: true
  },
  options: {
    type: Map,
    of: Number, // vote count
    default: {}
  },
  number_of_votes: {
    type: Number,
    default: 0
  },
  created_at: {
    type: Date,
    default: () => new Date(Date.now() + 3 * 60 * 60 * 1000)  // 3 hours later
  },
  expires_at: {
    type: Date,
    default: () => new Date(Date.now() + 1 * 24 * 60 * 60 * 1000) // 1 day later
  }
});

module.exports = mongoose.model('Poll', pollSchema);
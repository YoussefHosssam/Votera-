const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password_hash: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  friends: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
    default: []
  },
  friend_requests: {
    type: [Schema.Types.ObjectId],
    ref: 'User',
    default: []
  }
});

//hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password_hash')) return next();
  this.password_hash = await bcrypt.hash(this.password_hash, 12);
  next();
});

module.exports = mongoose.model('User', userSchema);
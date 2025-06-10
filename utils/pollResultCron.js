const cron = require('node-cron');
const EventEmitter = require('events');
const pollResultEmitter = new EventEmitter();
const sendEmail = require('./emailSendSubscription');
const Subscription = require('../models/Subscription');
const Poll = require('../models/poll');
const User = require('../models/user');

function mapToString(map) {
    return Array.from(map.entries())
      .map(([option, votes]) => `${option}: ${votes} votes`)
      .join('\n');
  }

cron.schedule('* * * * * *', async () => {
  const now = new Date(Date.now() + 3 * 60 * 60 * 1000);
  const expiredPolls = await Poll.find({ expires_at: { $lt: now }, is_active: true });
  for (const poll of expiredPolls) {
    pollResultEmitter.emit('pollResult', poll);
    poll.is_active = false;
    await poll.save();
  }
});

pollResultEmitter.on('pollResult', async (poll) => {
  const subscribers = await Subscription.find({
    poll_id: poll._id
  });
  const pollResult = await Poll.findById(poll._id);
  const result = mapToString(pollResult.options);

  subscribers.forEach(async (subscriber) => {
    const user = await User.findById(subscriber.user_id);
    await sendEmail.sendEmail(user.email, `Poll Result`, `The poll ${poll.title} has expired. The result is ${result}`);
  });
});

module.exports = pollResultEmitter;
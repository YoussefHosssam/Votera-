const nodemailer = require('nodemailer');
const eventEmitter = require('./pollResultCron');
const Poll = require('../models/poll');
const Subscription = require('../models/Subscription');

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text
    };
    await transporter.sendMail(mailOptions);
};

'use strict';
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'ee2e372b270b41',
    pass: '976afb3823e189',
  },
});

module.exports = transporter;

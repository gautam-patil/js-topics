const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../config/logger');
console.log(config.email.smtp);
const transport = nodemailer.createTransport(config.email.smtp);
/* istanbul ignore next */
if (config.env !== 'test') {
  transport
    .verify()
    .then(() => logger.info('Connected to email server'))
    .catch((err) => console.log(err));
}
// logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env')

/**  
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async (to, subject, text) => {
  const msg = { from: process.env.EMAIL_FROM, to, subject, text };
  console.log(msg);
  await transport.sendMail(msg);
};

/**
 * Send reset password email
 * @param {string} to 
 * @param {string} token
 * @returns {Promise} 
 */
const sendResetPasswordEmail = async (to, token) => {
  try{
  const subject = 'Reset password';
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `${process.env.FORGOT_PASSWORD_WEBAPP}?token=${token}`;
  const text = `Dear user,
  To reset your password, click on this link: ${resetPasswordUrl}
  If you did not request any password resets, then ignore this email.`;
  await sendEmail(to, subject, text);
  }catch(err){
    console.log(err);
  }
};

const sendConfirmEmail = async (to,otp) => {
  try{
  const subject = 'Confirm Email';
  // replace this url with the link to the reset password page of your front-end app
  const text = `Dear user,
  To verify your email, otp is : ${otp}
  If you did not request, then ignore this email.`;
  await sendEmail(to, subject, text);
  }catch(err){
    console.log(err);
  }
};

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendConfirmEmail
};

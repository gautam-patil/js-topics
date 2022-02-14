
const nodemailer = require('nodemailer');
var sgTransport = require("nodemailer-sendgrid-transport");
exports.sendEmail = async (option) => {
    var options = {
      auth: {
        api_key: process.env.SENDGRID_API_KEY,
      },
    };
  
    var client = nodemailer.createTransport(sgTransport(options));
    var mailOptions = {
      from: process.env.EMAIL_FROM,
      to: option.email,
      subject: option.subject,
      text: option.message,
      //html: "<b>Hello world</b>",
    };
    client
      .sendMail(mailOptions)
      .then((res) => {
        console.log("sent");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
const nodemailer = require("nodemailer");
require("dotenv").config();
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.email,
    pass: process.env.pass,
  },
});

const sendEmail = async (to, subject, html) => {
  const option = {
    from: process.env.email,
    to,
    subject,
    html,
  };
  return await transport.sendMail(option);
};

module.exports = sendEmail;

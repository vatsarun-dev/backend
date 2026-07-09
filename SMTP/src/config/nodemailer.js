const nodemailer = require("nodemailer");

// TO CREATE THE INSTANCE OF NODEMAILER WE USING CREATETRANSPORT METHOD WHICH ACCEPT TO PARAMETER SERVICE AND AUTH
const transport = nodemailer.createTransport({
  // THIS SERVICE METHOD IS USED TO TELL THE NODEMAILER THAT I WANT GMAIL SERVICES OR OUTLET SERVICES
  service: "gmail",
  //   AUTH KEY DEFINE THE USER WHICH SEND THE MAIL BEHAVE OF THEM LIKE WHOSE SEND THE MAIL
  auth: {
    user: process.env.email,
    pass: process.env.pass,
  },
});

const sendEmail = async (to, subject, text) => {
  const option = {
    from: process.env.email,
    to,
    subject,
    text,
  };
  return await transport.sendMail(option);
};
module.exports = sendEmail;

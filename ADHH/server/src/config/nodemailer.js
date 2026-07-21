import nodemailer from "nodemailer";
import env from "./env.js";
const transport = new nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.EMAIL,
    pass: env.PASSWORD,
  },
});

const sendEmail = async (to, subject, html) => {
  const option = {
    from: env.EMAIL,
    to,
    subject,
    html,
  };
  return await transport.sendMail(option);
};
export default sendEmail;

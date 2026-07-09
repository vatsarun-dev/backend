const express = require("express");
const app = express();
const sendEmail = require("./config/nodemailer");

app.get("/gmail", async (req, res) => {
  await sendEmail(
    process.env.receiverMail,
    "This is trial email",
    "hello guys kese ho aap sbhi m to acha hu",
  );
  res.send("mil gyaa");
});
module.exports = app;

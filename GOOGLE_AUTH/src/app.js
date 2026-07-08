const express = require("express");
const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
const authMiddleware = require("./middlewares/auth.middleware");
const routes = require("./routes/auth.route");
const app = express();

app.use(express.json());
// WE HAVE TO INITIALIZE THE PASSPORT BEFORE USING THEM TO COMBINE THE PASSPORT WITH THE EXPRESS
app.use(passport.initialize());

// THIS IS THE MIDDLEWARE TO USE GOOGLE AUTH SCREEN IN OUR PROJECT
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackURL: process.env.callBackUrl,
    },
    (accessToken, refreshToken, profile, cb) => {
      return cb(null, profile);
    },
  ),
);

app.use("/api/auth", routes);
app.use("/", (req, res) => {
  res.send("nhi hua login ");
});

app.use(authMiddleware);

module.exports = app;

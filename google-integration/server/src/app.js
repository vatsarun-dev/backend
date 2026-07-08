const express = require("express");
const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
const authMiddleware = require("./middlewares/auth.middleware");
const routes = require("./routes/auth.route");
const userModel = require("./models/user.model");
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
    async (accessToken, refreshToken, profile, cb) => {
      const name = profile.name.givenName;
      const email = profile.emails[0].value;

      const isExisted = await userModel.findOne({ email });
      if (isExisted) return cb(null, profile);
      const newUser = await userModel.create({
        name,
        email,
        provider: "google",
        provider_id: profile.id,
      });

      return newUser;
    },
  ),
);

app.use("/api/auth", routes);
app.use("/", (req, res) => {
  res.send("nhi hua login ");
});

app.use(authMiddleware);

module.exports = app;

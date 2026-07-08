const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const routes = express.Router();

routes.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);
routes.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_TOKEN, {
      expiresIn: "15m",
    });

    res.cookie("accessToken", token);

    res.send("ok");
    console.log(req.user);
  },
);
module.exports = routes;

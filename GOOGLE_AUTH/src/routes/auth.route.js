const express = require("express");
const passport = require("passport");
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
    res.send("ok");
    console.log(req.user);
  },
);
module.exports = routes;

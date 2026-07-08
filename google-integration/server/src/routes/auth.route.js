const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const authController = require("../controllers/auth.controller");
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
  authController,
);
module.exports = routes;

const express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/user.controller");
const routes = express.Router();

routes.post("/register", registerController);
routes.post("/login", loginController);
module.exports = routes;

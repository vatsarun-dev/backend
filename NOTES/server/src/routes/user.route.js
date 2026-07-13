const express = require("express");
const {
  registerController,
  loginController,
  getAllUserController,
  userUpdateController,
  deleteUserController,
} = require("../controllers/user.controller");
const routes = express.Router();

routes.post("/register", registerController);
routes.post("/login", loginController);
routes.patch("/update/:id", userUpdateController);
routes.delete("/delete/:id", deleteUserController);
routes.get("/all", getAllUserController);
module.exports = routes;

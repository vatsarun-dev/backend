const express = require("express");
const {
  createUserController,
  getUserController,
  loginUserController,
} = require("../controllers/user.controller.js");

const router = express.Router();

router.post("/register", createUserController);
router.post("/login", loginUserController);
router.get("/get", getUserController);

module.exports = router;

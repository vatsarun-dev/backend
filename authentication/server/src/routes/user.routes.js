const express = require("express");
const {
  createUserController,
  getUserController,
} = require("../controllers/user.controller.js");

const router = express.Router();

router.post("/register", createUserController);
router.get("/get", getUserController);

module.exports = router;

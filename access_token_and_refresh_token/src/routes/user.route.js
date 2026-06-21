const express = require("express");
const router = express.Router();
const {
  registerController,
  loginController,
} = require("../controllers/user.controller.js");

router.use("/register", registerController);
router.use("/login", loginController);

module.exports = router;

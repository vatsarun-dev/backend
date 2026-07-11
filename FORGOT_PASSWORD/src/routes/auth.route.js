const express = require("express");
const {
  registerController,
  loginController,
  forgotPasswordController,
  resetPasswordLinkController,
} = require("../controllers/auth.controller");

const router = express.Router();

router.get("/", (req, res) => res.render("index"));
router.post("/forgot_password", forgotPasswordController);
router.get("/reset-password/:token", resetPasswordLinkController);
router.post("/register", registerController);
router.post("/login", loginController);

module.exports = router;

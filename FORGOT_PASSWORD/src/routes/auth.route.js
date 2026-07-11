const express = require("express");
const {
  registerController,
  loginController,
  forgotPasswordController,
  resetPasswordLinkController,
  updatePasswordController,
  userLogoutController,
} = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

router.get("/", (req, res) => res.render("index"));
router.post("/forgot_password", forgotPasswordController);
router.get("/reset-password/:token", resetPasswordLinkController);
router.post("/update-password/:userId", updatePasswordController);
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/logout", userLogoutController);
router.get("/home", authMiddleware, (req, res) => {
  res.send("ye vala page tb chlega jb m cookie hoga");
});

module.exports = router;

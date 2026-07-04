const express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/user.controller");
const accessTokenMiddleware = require("../middlewares/access.middleware");
const router = express.Router();

router.get("/me", accessTokenMiddleware, async (req, res) => {
  res.status(200).json({
    message: "User get all time",
    user: req.user,
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("accessToken");
  res.status(200).json({
    message: "User logout",
  });
});
router.post("/register", registerController);
router.post("/login", loginController);
module.exports = router;

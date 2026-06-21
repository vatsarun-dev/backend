const express = require("express");
const router = express.Router();
const {
  registerController,
  loginController,
} = require("../controllers/user.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js");

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/", authMiddleware, async (req, res) => {
  try {
    console.log("i am in home page");
  } catch (error) {
    console.log("there is some error");
  }
});

module.exports = router;

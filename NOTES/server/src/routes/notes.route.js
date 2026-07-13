const express = require("express");
const {
  notesController,
  readController,
  patchController,
  deleteController,
} = require("../controllers/notes.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

router.post("/create", authMiddleware, notesController);
router.patch("/update/:id", authMiddleware, patchController);
router.get("/read", authMiddleware, readController);
router.delete("/delete/:id", authMiddleware, deleteController);
module.exports = router;

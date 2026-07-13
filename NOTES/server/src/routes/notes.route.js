const express = require("express");
const {
  notesController,
  readController,
  patchController,
  deleteController,
} = require("../controllers/notes.controller");
const router = express.Router();

router.post("/create", notesController);
router.patch("/update/:id", patchController);
router.get("/read", readController);
router.delete("/delete/:id", deleteController);
module.exports = router;

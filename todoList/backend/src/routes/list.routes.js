let express = require("express");
let {
  updateListController,
  getAllController,
  createListController,
  deleteListController,
} = require("../controllers/list.controller.js");
let router = express.Router();

// POST API
router.post("/create", createListController);

// GET API
router.get("/", getAllController);

// PUT API
router.put("/update/:id", updateListController);

// DELETE API
router.delete("delete/:id", deleteListController);
module.exports = router;

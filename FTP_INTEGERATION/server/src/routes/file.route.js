const express = require("express");
const routes = express.Router();
const uploads = require("../config/multer");
const {
  fileController,
  multiFileController,
} = require("../controllers/file.controller");

routes.post("/upload-files", uploads.single("image"), fileController);
routes.post(
  "/multiple-upload-files",
  uploads.array("image", 6),
  multiFileController,
);

module.exports = routes;

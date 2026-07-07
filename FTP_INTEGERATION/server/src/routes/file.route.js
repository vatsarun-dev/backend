const express = require("express");
const routes = express.Router();
const uploads = require("../config/multer");
const fileController = require("../controllers/file.controller");

routes.post("/upload-files", uploads.single("image"), fileController);

module.exports = routes;

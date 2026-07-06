const express = require("express");
const routes = express.Router();
const fileController = require("../controllers/file.controller");

routes.post("/upload-files", fileController);

module.exports = routes;

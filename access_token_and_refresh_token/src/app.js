const express = require("express");
const app = express();
const router = require("./routes/user.route.js");

app.use("/api/user", router);
module.exports = app;

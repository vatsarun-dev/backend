const express = require("express");
const router = require("./routes/user.routes.js");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/user", router);
module.exports = app;

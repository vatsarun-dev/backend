const express = require("express");
const app = express();
const router = require("./routes/user.route.js");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use("/api/access_user", router);
module.exports = app;

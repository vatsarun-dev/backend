const express = require("express");
const router = require("./routes/user.routes.js");
const app = express();
app.use(express.json());

app.use("/api/user", router);
module.exports = app;

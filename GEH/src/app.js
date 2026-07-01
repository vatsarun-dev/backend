const express = require("express");
const router = require("./routes/auth.route");
const globalHandler = require("./middlewares/auth.middleware");
const app = express();

app.use(express.json());

app.use("/api/user", router);

// it should be placed after the api not the first one
// global error handler
app.use(globalHandler);
module.exports = app;

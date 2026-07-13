const express = require("express");
const app = express();
const router = require("./routes/notes.route");
app.use(express.json());

app.use("/api/notes", router);
module.exports = app;

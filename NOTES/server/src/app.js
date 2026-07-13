const express = require("express");
const app = express();
const router = require("./routes/notes.route");
const routes = require("./routes/user.route");
app.use(express.json());

app.use("/api/notes", router);
app.use("/api/user", routes);
module.exports = app;

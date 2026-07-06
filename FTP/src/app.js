const express = require("express");
const app = express();
const routes = require("./routes/user.route");
app.use(express.json());

// this middleware is used to read the form data from frontend
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", routes);

module.exports = app;

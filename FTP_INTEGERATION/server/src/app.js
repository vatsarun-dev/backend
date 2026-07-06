const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./routes/file.route");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("/api/file", routes);

module.exports = app;

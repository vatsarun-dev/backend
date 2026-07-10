const express = require("express");
const path = require("path");
const cors = require("cors");
const authMiddleware = require("./middlewares/auth.middleware");
const authRoutes = require("./routes/auth.route");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

app.use("/api/auth", authRoutes);
app.use(authMiddleware);

module.exports = app;

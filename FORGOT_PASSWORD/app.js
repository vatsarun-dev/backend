const express = require("express");
const cors = require("cors");
const authMiddleware = require("./src/middlewares/auth.middleware");
const authRoutes = require("./src/routes/auth.route");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

app.use("/api/auth", authRoutes);
app.use(authMiddleware);

module.exports = app;

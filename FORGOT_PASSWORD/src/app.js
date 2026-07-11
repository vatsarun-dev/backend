const express = require("express");
const path = require("path");
const cors = require("cors");
const authMiddleware = require("./middlewares/err.middleware");
const authRoutes = require("./routes/auth.route");
const cookieParser = require("cookie-parser");
const cacheInstance = require("./config/caching");

const app = express();
app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

cacheInstance.on("connect", () => {
  console.log("your redis is connected");
});

cacheInstance.on("error", (err) => {
  console.log(err);
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use(authMiddleware);

module.exports = app;

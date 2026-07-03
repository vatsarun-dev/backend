const express = require("express");
const router = require("./routes/user.route");
const authMiddleware = require("./middlewares/auth.middleware");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use("/api/user", router);

app.use(authMiddleware);

module.exports = app;

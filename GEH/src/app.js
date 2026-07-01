const express = require("express");
const router = require("./routes/auth.route");
const app = express();

app.use(express.json());

app.use("/api/user", router);

// it should be placed after the api not the first one
// global error handler
app.use((err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    message: message,
  });
});
module.exports = app;

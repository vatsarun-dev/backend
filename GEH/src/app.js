const express = require("express");
const router = require("./routes/auth.route");
const app = express();

app.use(express.json());

app.use("/api/user", router);

// global error handler
app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
  });
});
module.exports = app;

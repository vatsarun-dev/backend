let express = require("express");
let cors = require("cors");
let router = require("./routes/list.routes.js");
let app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
// this is the new method to use api to seperate the path and logic function
app.use("/api/list", router);
module.exports = app;

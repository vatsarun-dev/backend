// REQUIRING DOTENV
require("dotenv").config();
const connectDB = require("./src/config/db.js");
const app = require("./src/app.js");
connectDB();
app.listen(3000, () => {
  console.log("your app is running on port 3000");
});

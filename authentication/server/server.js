const app = require("./src/app.js");
const connectDB = require("./src/config/db.js");
require("dotenv").config();
connectDB();
port = process.env.PORT || 4000;
app.listen(port, () => {
  try {
    console.log(`app is running on ${port}`);
  } catch (error) {
    console.log("there is an error during connection");
  }
});

const app = require("./src/app.js");
require("dotenv").config();
const connectDB = require("./src/config/db.js");

connectDB();
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`app is running on ${port}`);
});

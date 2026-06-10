let app = require("./src/app.js");
let connectDB = require("./src/config/db.js");
require("dotenv").config();
connectDB();
let port = process.env.PORT;

app.listen(port, () => {
  console.log(`app is running on ${port}`);
});

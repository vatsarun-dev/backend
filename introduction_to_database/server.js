const app = require("./src/app.js");
const connectDB = require("./src/config/db.js");

// connecting the database
connectDB();

port = 3000;
app.listen(port, () => {
  console.log(`app is running on ${port}`);
});

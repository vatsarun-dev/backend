require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db");
connectDB();
PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`app is running on ${PORT}`);
});

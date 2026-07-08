require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db");
const PORT = process.env.PORT;

connectDB();
app.listen(PORT, () => {
  console.log(`your app is running on ${PORT}`);
});

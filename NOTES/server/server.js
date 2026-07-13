require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db");
connectDB();
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`your app is running on ${PORT}`);
});

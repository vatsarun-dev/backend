require("dotenv").config();
const app = require("./src/app");

app.listen(3000, () => {
  console.log("your app is running on 3000");
});

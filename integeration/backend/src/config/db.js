const mongoose = require("mongoose");

let connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONG_URL);
    console.log("your mongodb is connected successfully");
  } catch (error) {
    console.log("there is some error in connection");
  }
};
module.exports = connectDB;

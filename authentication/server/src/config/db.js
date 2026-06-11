const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("your mongodb is connected successfully");
  } catch (error) {
    console.log("there is some error during connection of database", error);
  }
};
module.exports = connectDB;

const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("mongodb is connected successfully");
  } catch (error) {
    console.log("there is an error while connecting to the database");
  }
};

module.exports = connectDB;

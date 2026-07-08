const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("your database  is connected successfully");
  } catch (error) {
    console.log("there is an error in mongodb", error);
  }
};

module.exports = connectDB;

const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("your database is connected");
  } catch (error) {
    console.log("there is an error while connecting");
  }
};

module.exports = connectDB;

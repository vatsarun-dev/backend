// importing mongoose
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("khud se use kro");
    console.log("your app is connected with your mongodb");
  } catch (error) {
    console.log("there is an error while connecting the database", error);
  }
};

module.exports = connectDB;

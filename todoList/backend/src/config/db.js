let mongoose = require("mongoose");
let connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("mongodb is connected successfully");
  } catch (error) {
    console.log("there is some error in connecting database", error);
  }
};
module.exports = connectDB;

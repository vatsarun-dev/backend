const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("your mongodb is connected successfully");
  } catch (error) {
    return res.status(500).json({
      message: "There is some error while connecting the database",
      error,
    });
  }
};

module.exports = connectDB;

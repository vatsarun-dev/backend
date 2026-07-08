const mongoose = require("mongoose");
const asyncHandler = require("../utils/asyncHandler");
const connectDB = asyncHandler(async () => {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("your database  is connected successfully");
});

module.exports = connectDB;

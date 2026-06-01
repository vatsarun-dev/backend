const mongoose = require("mongoose");

// creating database schema means it tells that what field the data has been stored.
// it is like blueprint(class). it doesn't interact with the database directly.

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    mobile: Number,
    password: String,
  },
  {
    timestamps: true,
  },
);

// it is the model which is interact with the database and in which the folder has been created
// in short term it is the collection of dataset

let userModel = mongoose.model("user", userSchema, "user");
module.exports = userModel;

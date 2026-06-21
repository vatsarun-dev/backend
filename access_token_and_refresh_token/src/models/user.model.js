const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    mobile: {
      type: Number,
      trim: true,
      required: true,
    },
  },
  { timestamps: true },
);

//this is some predefine middleware to use and make your controller lightweight

// this middleware is use to hash the password in schema
userSchema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 10);
});

// this middleware is use to generate the token here not in the controller
userSchema.methods.generateJWT = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_TOKEN, { expiresIn: "1h" });
};

// this middleware is use to compare the password while login the user in schema
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
const userModel = mongoose.model(
  "accessTokenUser",
  userSchema,
  "accessTokenUser",
);

module.exports = userModel;

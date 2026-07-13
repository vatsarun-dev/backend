const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      minLength: 3,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
      minLength: 6,
      maxLength: 8,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", function () {
  this.password = bcrypt.hashSync(this.password, 10);
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJwt = function (_id) {
  return jwt.sign({ id: _id }, process.env.JWT, { expiresIn: "10m" });
};

const userModel = mongoose.model("users", notesSchema, "user");
module.exports = userModel;

import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new Schema(
  {
    name: {
      type: String,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    avatar: {
      type: String,
      default: function () {
        return `https://ui-avatars.com/api/?name=${this.name}`;
      },
    },

    password: {
      type: String,
      required: true,
    },

    mobile: {
      type: Number,
      required: true,
    },
    addresses: [
      {
        fullName: {
          type: String,
          required: true,
        },
        phone: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        pincode: {
          type: Number,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
        landmark: String,
        isDefault: {
          type: Boolean,
          default: false,
        },
      },
    ],

    role: {
      type: String,
      default: "user",
    },

    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", function () {
  if (!this.isModified("password")) return;
  this.password = bcrypt.hashSync(this.password, 10);
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const userModel = model("userModel", userSchema);
export default userModel;

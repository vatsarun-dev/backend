let mongoose = require("mongoose");
let listSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

let listModel = mongoose.model("list", listSchema, "list");
module.exports = listModel;

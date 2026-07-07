const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    image: [
      {
        type: String,
      },
    ],
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const FileModel = mongoose.model("FileModel", fileSchema, "FileModel");

module.exports = FileModel;

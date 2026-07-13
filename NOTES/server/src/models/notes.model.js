const mongoose = require("mongoose");
const notesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      minLength: 3,
    },
    description: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  },
);

const notesModel = mongoose.model("notes", notesSchema, "notes");
module.exports = notesModel;

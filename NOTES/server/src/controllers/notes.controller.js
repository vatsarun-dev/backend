const notesModel = require("../models/notes.model");
const notesController = async (req, res) => {
  try {
    let { title, description } = req.body;
    if (!title || !description) throw new Error("missing fields");
    const newUser = await notesModel.create({
      title,
      description,
    });

    return res.status(200).json({
      message: "Note created successfully",
      newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "there is some error",
      error: error,
    });
  }
};

const readController = async (req, res) => {
  try {
    const notes = await notesModel.find();
    return res.status(200).json({
      message: "all notes",
      notes,
    });
  } catch (error) {
    return res.status(500).json({
      message: "there is some error",
      error: error,
    });
  }
};

const patchController = async (req, res) => {
  try {
    let { title, description } = req.body;
    let { id } = req.params;

    if (!id) throw new Error("give me the correct id");

    const notes = await notesModel.findByIdAndUpdate(id, {
      title,
      description,
    });
    return res.status(200).json({
      message: "updated notes",
      notes,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "error",
      error,
    });
  }
};

const deleteController = async (req, res) => {
  try {
    let { id } = req.params;
    if (!id) throw new Error("id is required");
    const user = await notesModel.findByIdAndDelete(id);

    return res.status(200).json({ message: "user deleted" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
module.exports = {
  notesController,
  readController,
  patchController,
  deleteController,
};

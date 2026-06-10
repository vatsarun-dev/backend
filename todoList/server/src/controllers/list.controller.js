let listModel = require("../models/list.models.js");

// post api controller
let createListController = async (req, res) => {
  try {
    let { taskName, description } = req.body;
    if (!taskName || !description)
      return res.status(400).json({
        message: "All fields are required",
      });
    let list = await listModel.create({
      taskName,
      description,
    });

    return res.status(201).json({
      message: "list created successfully",
      newList: list,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// get api controller
let getAllController = async (req, res) => {
  try {
    let newList = await listModel.find();

    if (!newList.length)
      return res.status(204).json({
        message: "list is empty",
      });

    return res.status(200).json({
      message: "list fetched successfully",
      list: newList,
    });
  } catch (error) {
    return res.status(500).json({
      message: "there is some error ",
    });
  }
};

// put api controller
let updateListController = async (req, res) => {
  try {
    let { id } = req.params;
    if (!id)
      return res.status(404).json({
        message: "id not found",
      });
    let { taskName, description } = req.body;
    let listUpdate = await listModel.findByIdAndUpdate(
      id,
      {
        taskName,
        description,
      },
      { new: true },
    );

    return res.status(200).json({
      message: "list update successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "there is some error ",
    });
  }
};

// delete api controller
let deleteListController = async (req, res) => {
  try {
    let { id } = req.params;
    if (!id)
      return res.status(404).json({
        message: "id not found",
      });
    await listModel.findByIdAndDelete(id);
    return res.status(200).json({
      message: "item delete successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
module.exports = {
  updateListController,
  getAllController,
  createListController,
  deleteListController,
};

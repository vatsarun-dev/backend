const FileModel = require("../models/file.model");
const sendFile = require("../config/Imagekit");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const fileService = async (data) => {
  if (!data) throw new ApiError(404, "file does not found");

  const uploadedFile = await sendFile(data.buffer, data.originalname);

  const newFile = await FileModel.create({
    name: "Image-1",
    image: uploadedFile.url,
  });

  return newFile;
};

module.exports = fileService;

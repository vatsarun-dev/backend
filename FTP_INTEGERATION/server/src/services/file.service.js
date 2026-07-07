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

const multiFileService = async (data) => {
  if (!data) throw new ApiError(404, "file does not found");
  const uploadedFiles = await Promise.all(
    data.map(async (elem) => {
      return await sendFile(elem.buffer, elem.originalname);
    }),
  );
  const newFiles = await FileModel.create({
    name: "Images",
    image: uploadedFiles.map((elem) => elem.url),
  });

  return newFiles;
};

module.exports = { fileService, multiFileService };

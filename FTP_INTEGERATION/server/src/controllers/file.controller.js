const asyncHandler = require("../utils/asyncHandler");
const { fileService, multiFileService } = require("../services/file.service");

const fileController = asyncHandler(async (req, res) => {
  const file = req.file;

  const result = await fileService(file);

  return res.status(200).json({
    message: "File uploaded successfully",
    newFile: result,
  });
});

const multiFileController = asyncHandler(async (req, res) => {
  const files = req.files;

  const result = await multiFileService(files);

  return res.status(200).json({
    message: "File uploaded successfully",
    newFile: result,
  });
});

module.exports = { fileController, multiFileController };

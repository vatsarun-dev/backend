const asyncHandler = require("../utils/asyncHandler");
const fileService = require("../services/file.service");

const fileController = asyncHandler(async (req, res) => {
  const file = req.file;

  const result = fileService(file);

  return res.status(200).json({
    message: "File uploaded successfully",
    newFile,
  });
});

module.exports = fileController;

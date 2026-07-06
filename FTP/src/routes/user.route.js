const express = require("express");
const routes = express.Router();
const uploads = require("../config/multer");
const sendFiles = require("../config/imageKit");

//when we accept only single image at a time so we use uploads.single(key) to get them we use req.file
// when we accept multiple images at a time so we use uploads.array(key) to get them we use req.files
routes.post("/file", uploads.array("image"), async (req, res) => {
  //  this method is used to send the single data at a time
  //   try {
  //     if (!req.file) {
  //       return res.status(400).json({ message: "No file uploaded" });
  //     }
  //     const file = req.file;
  //     const uploadedFiles = await sendFiles(file.buffer, file.originalname);
  //     console.log("Uploaded file details:", uploadedFiles);
  //     return res.status(200).json({
  //       message: "File uploaded successfully",
  //       data: uploadedFiles,
  //     });
  //   } catch (error) {
  //     console.error("Upload error:", error);
  //     return res.status(500).json({
  //       message: "File upload failed",
  //       error: error.message,
  //     });
  //   }
  // THIS METHOD IS USED TO SEND MULTIPLE FILES AT A TIME

  try {
    if (!req.files) return res.status(500).json({ message: "File not found" });

    const file = req.files;
    const uploadedFiles = await Promise.all(
      file.map(async (elem) => {
        return await sendFiles(elem.buffer, elem.originalname);
      }),
    );
    console.log(uploadedFiles);
    return res.send("successfully uploaded");
  } catch (error) {
    return res.status(500).json({ message: error.message, error });
  }
});

module.exports = routes;

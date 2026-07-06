const multer = require("multer");

// this is used to store the file for local so thats why we use diskStorage

// let storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + file.originalname);
//   },
// });

// this is use to send the file into buffer so that we can store them into cloud
let storage = multer.memoryStorage();

let uploads = multer({ storage: storage });

module.exports = uploads;

// this is File Transfer Protocol

const multer = require("multer");

const storage = multer.memoryStorage();

const uploads = multer({ storage: storage });

module.exports = uploads;

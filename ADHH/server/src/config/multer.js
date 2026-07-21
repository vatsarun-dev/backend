import multer from "multer";
const storage = multer.memoryStorage();
export const uploads = multer({ storage: storage });

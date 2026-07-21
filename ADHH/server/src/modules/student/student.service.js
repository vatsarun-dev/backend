import StudentRepo from "../../repository/student.repository.js";
import * as error from "../../shared/error/globalError.js";
import sendFile from "../../config/ImageKit.js";

export default class StudentService {
  constructor() {
    this.studentService = new StudentRepo();
  }

  async studentRegisterService(data, file) {
    let { name, email, studentId, mobile } = data;

    if (!name || !email || !studentId || !mobile)
      throw new error.NOTFOUNDERROR("All fields are required");
    data.image = file.url;
    const student = await this.studentService.create(data);
    return student;
  }

  async fileUploadService(data) {
    if (!data) throw new error.NOTFOUNDERROR("no image found");
    const file = await sendFile(data.buffer, data.originalname);
    return file;
  }
}

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

  async listStudentsService() {
    return await this.studentService.findAll();
  }

  async searchStudentsService(query) {
    return await this.studentService.search(query);
  }

  async dashboardService() {
    const students = await this.studentService.findAll();
    const today = new Date();
    const todayKey = today.toISOString().slice(0, 10);
    const byClass = students.reduce((acc, student) => {
      const key = `Class ${student.class}`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    return {
      totalStudents: students.length,
      todaysRegistrations: students.filter(
        (student) => student.createdAt?.toISOString().slice(0, 10) === todayKey,
      ).length,
      studentsPerClass: byClass,
      recentStudents: students.slice(0, 6),
    };
  }

  async fileUploadService(data) {
    if (!data) throw new error.NOTFOUNDERROR("no image found");
    const file = await sendFile(data.buffer, data.originalname);
    return file;
  }
}

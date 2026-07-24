import StudentService from "./student.service.js";
export default class StudentController {
  constructor() {
    this.studentController = new StudentService();
  }

  async studentRegisterController(req, res) {
    const file = await this.studentController.fileUploadService(req.file);

    const student = await this.studentController.studentRegisterService(
      req.body,
      file,
    );

    res.status(200).json({
      message: "student add successfully",
      student: student,
    });
  }

  async listStudentsController(req, res) {
    const students = await this.studentController.listStudentsService();
    res.status(200).json({ students });
  }

  async searchStudentsController(req, res) {
    const students = await this.studentController.searchStudentsService(
      req.query.q,
    );
    res.status(200).json({ students });
  }

  async dashboardController(req, res) {
    const dashboard = await this.studentController.dashboardService();
    res.status(200).json({ dashboard });
  }
}

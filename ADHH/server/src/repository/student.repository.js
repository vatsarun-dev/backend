import studentModel from "../models/student.model.js";
export default class StudentRepo {
  async create(payload) {
    return await studentModel.create(payload);
  }

  async findAll() {
    return await studentModel.find({}).sort({ createdAt: -1 });
  }

  async search(query = "") {
    const value = String(query).trim();
    const classNumber = Number(value);
    const filters = value
      ? {
          $or: [
            { studentId: { $regex: value, $options: "i" } },
            { name: { $regex: value, $options: "i" } },
            { fatherName: { $regex: value, $options: "i" } },
            { course: { $regex: value, $options: "i" } },
            { mobile: { $regex: value, $options: "i" } },
            ...(Number.isFinite(classNumber) ? [{ class: classNumber }] : []),
          ],
        }
      : {};

    return await studentModel.find(filters).sort({ createdAt: -1 }).limit(80);
  }

  async findByEmail(email) {
    return await studentModel.findOne({ email });
  }

  async findById(id) {
    return await studentModel.findById(id);
  }
}

import studentModel from "../models/student.model.js";
export default class StudentRepo {
  async create(payload) {
    return await studentModel.create(payload);
  }
  async findByEmail(email) {
    return await studentModel.findOne({ email });
  }

  async findById(id) {
    return await studentModel.findById(id);
  }
}

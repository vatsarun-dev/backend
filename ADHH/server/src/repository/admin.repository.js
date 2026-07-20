import adminModel from "../models/admin.model.js";
export default class AdminRepo {
  async create(payload) {
    return await adminModel.create(payload);
  }
  async findByEmail(email) {
    return await adminModel.findOne({ email });
  }

  async findById(id) {
    return await adminModel.findById(id);
  }
}

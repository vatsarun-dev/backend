import adminModel from "../models/admin.model.js";

export default class AdminRepo {
  async createUser(payload) {
    return await adminModel.create(payload);
  }

  async findByEmail(email) {
    return await adminModel.findOne({ email });
  }

  async findById(id) {
    return await adminModel.findById(id);
  }

  async updatePassword(id, password) {
    return await adminModel.findByIdAndUpdate(id, { password });
  }
}

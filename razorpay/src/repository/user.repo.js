import userModel from "../models/user.model.js";

export default class UserRepo {
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

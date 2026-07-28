import userModel from "../models/auth.model.js";

export default class UserRepo {
  async createUser(payload) {
    return await userModel.create(payload);
  }

  async findByEmail(email) {
    return await userModel.findOne({ email });
  }

  async findById(id) {
    return await userModel.findById(id);
  }

  async updatePassword(id, password) {
    return await userModel.findByIdAndUpdate(id, { password });
  }
}

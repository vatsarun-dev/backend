import AdminRepo from "../../repository/admin.repo.js";
import * as error from "../../shared/error/globalError.js";
import * as token from "../../utils/generateToken.js";
export default class AdminService {
  constructor() {
    this.adminService = new AdminRepo();
  }
  // THIS IS THE REGISTRATION LOGIC
  async createUserService(data) {
    let { name, email, password, mobile, avatar } = data;
    if (!name || !email || !password || !mobile)
      throw new error.NOTFOUNDERROR("all fields are required");

    const isExisted = await this.adminService.findByEmail(email);
    if (isExisted) throw new error.ALLREADYEXIST("User is already existed");
    const user = await this.adminService.createUser({ ...data, role: "admin" });
    const accessToken = token.generateAccessToken(user._id);
    const refreshToken = token.generateRefreshToken(user._id);

    user.refreshToken = refreshToken;
    await user.save();

    return { accessToken, refreshToken, user };
  }

  // THIS IS LOGIN LOGIC
  async loginUserService(data) {
    let { email, password } = data;

    if (!email || !password)
      throw new error.NOTFOUNDERROR("all fields are required");

    const isExisted = await this.adminService.findByEmail(email);
    if (!isExisted) throw new error.NOTFOUNDERROR("user not found");

    if (isExisted.role !== "admin") {
      throw new UNAUTHORIZED("Only admins can login here");
    }

    const compare = isExisted.comparePassword(password);

    if (!compare) throw new error.UNAUTHORIZED("Wrong Credential");

    const accessToken = token.generateAccessToken(isExisted._id);
    const refreshToken = token.generateRefreshToken(isExisted._id);

    isExisted.refreshToken = refreshToken;
    await isExisted.save();

    return { accessToken, refreshToken, isExisted };
  }
}

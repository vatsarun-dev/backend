import UserRepo from ".../repository/user.repository.js";

export default class AuthService {
  constructor() {
    this.userRepo = new UserRepo();
  }

  async createUser(user) {
    this.userRepo.create(user);
  }
}

const UserRepository = require("../../repositories/user.repository");
const UserService = require("../../services/user.service");
const { BadRequestException } = require("../../common/exceptions");

class UserController {
  constructor() {
    this.userService = new UserService(new UserRepository)
  }

  async signUp(req, res, next) {
    const { email, password, nick } = req.body;

    if (!email) {
      throw new BadRequestException("Email is required.");
    }

    if (!password) {
      throw new BadRequestException("Password is required.");
    } else if (password.length < 8 || password.length > 16) {
      throw new BadRequestException("Password must be 8-16 characters long.");
    }

    if (!nick) {
      throw new BadRequestException("Nick is required.");
    }

    const user = await this.userService.signUp({email, password, nick});
    return user;
  }

  async login(req, res, next) {
    const { email, password } = req.body;

    if (!email) {
      throw new BadRequestException("Email is required.");
    }

    if (!password) {
      throw new BadRequestException("Password is required.");
    } else if (password.length < 8 || password.length > 16) {
      throw new BadRequestException("Password must be 8-16 characters long.");
    }

    const token = await this.userService.login({ email, password });
    return token;
  }
}
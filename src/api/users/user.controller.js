const express = require("express");
const { wrap } = require("../../lib/wrap");
const UserRepository = require("../../repositories/user.repository");
const UserService = require("../../services/user.service");
const { BadRequestException } = require("../../common/exceptions");

class UserController {
  constructor() {
    this.path = "/users";
    this.router = express.Router();
    this.userService = new UserService(new UserRepository);
    this.initializeRoutes();
  }

  initializeRoutes() {
    const router = express.Router();
    router
      .post("/signup", this.signUp)
      .post("/login", this.login)
      .put("/nick", this.updated)
      .delete("/", this.deleted)
    
    this.router.use(this.path, router);
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

  async deleted(req, res, next) {
    const { email } = req.body;
    
    if (!email) {
      throw new BadRequestException("Email is required.");
    }

    const deleted = await this.userService.deleted({ email });
    return deleted;
  }

  async updated(req, res, next) {
    const { email, nick } = req.body;

    if (!email) {
      throw new BadRequestException("Email is required.");
    }

    if (!nick) {
      throw new BadRequestException("Nick is required.");
    }

    const updated = await this.userService.updated({ email, nick });
    return updated
  }
}

module.exports = UserController;
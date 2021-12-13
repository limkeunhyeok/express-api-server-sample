const express = require("express");

const UserValidation = require("./user.validation");
const { UserRepository } = require("../../repositories");
const { UserService } = require("../../services");
const { wrap } = require("../../lib/wrap");

const userService = new UserService(new UserRepository());
const userValidation = new UserValidation();

class UserController {
  constructor() {
    this.path = "/users";
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    const router = express.Router();
    router
      .post("/signup", wrap(this.signUp))
      .post("/login", wrap(this.login))
      .put("/nick", wrap(this.updateNick))
      .put("/password", wrap(this.updatePassword))
      .delete("/", wrap(this.deleteUser))
    
    this.router.use(this.path, router);
  }

  async signUp(req, res, next) {
    const { email, password, nick } = req.body;
    
    userValidation
      .email(email)
      .password(password)
      .nick(nick);

    await userService.signUp({ email, password, nick });
    return true;
  }

  async login(req, res, next) {
    const { email, password } = req.body;

    userValidation
      .email(email)
      .password(password);

    const token = await userService.login({ email, password });
    return { token }
  }

  async deleteUser(req, res, next) {
    const { user } = res.locals;
    userValidation
      .user(user);
  
    const { id } = user;
    const deleted = await userService.deleteUser({ id });
    return { deleted };
  }

  async updateNick(req, res, next) {
    const { user } = res.locals;
    const { nick } = req.body;
    userValidation
      .user(user)
      .nick(nick);
    
    const { id } = user;
    const updated = await userService.updated({ id, nick });
    return { updated };
  }
  
  async updatePassword(req, res, next) {
    const { user } = res.locals;
    const { password } = req.body;
    userValidation
      .user(user)
      .password(password);
    
    const { id } = user;
    const updated = await userService.updated({ id, password });
    return { updated };
  }
}

module.exports = UserController;
const express = require("express");

const UserRepository = require("../../repositories/user.repository");
const UserService = require("../../services/user.service");
const UserValidation = require("./user.validation");
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
      .put("/nick", wrap(this.updated))
      .delete("/", wrap(this.deleted))
    
    this.router.use(this.path, router);
  }

  async signUp(req, res, next) {
    const { email, password, nick } = req.body;
    
    userValidation.email(email);
    userValidation.password(password);
    userValidation.nick(nick);

    await userService.signUp({email, password, nick});
    return true;
  }

  async login(req, res, next) {
    const { email, password } = req.body;

    userValidation.email(email);
    userValidation.password(password);

    const token = await userService.login({ email, password });
    return { token }
  }

  async deleted(req, res, next) {
    const { user } = res.locals;
    userValidation.user(user);
  
    const { email } = user;
    const deleted = await userService.deleted({ email });
    return { deleted };
  }

  async updated(req, res, next) {
    const { user } = res.locals;
    userValidation.user(user);
    
    const { nick } = req.body;
    userValidation.nick(nick);
    
    const { email } = user;
    const updated = await userService.updated({ email, nick });
    return { updated };
  }
}

module.exports = UserController;
const express = require("express");

const UserRepository = require("../../repositories/user.repository");
const UserService = require("../../services/user.service");
const UserValidation = require("./user.validation");

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
      .post("/signup", this.signUp)
      .post("/login", this.login)
      .put("/nick", this.updated)
      .delete("/", this.deleted)
    
    this.router.use(this.path, router);
  }

  async signUp(req, res, next) {
    try {
      const { email, password, nick } = req.body;
      
      userValidation.email(email);
      userValidation.password(password);
      userValidation.nick(nick);

      const user = await userService.signUp({email, password, nick});
      return res.json(user);
    } catch (error) {
      next(error)
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      userValidation.email(email);
      userValidation.password(password);
  
      const token = await userService.login({ email, password });
      return res.json(token);
    } catch (error) {
      next(error)
    }
  }

  async deleted(req, res, next) {
    try {
      const { email } = req.body;
    
      userValidation.email(email);

      const deleted = await userService.deleted({ email });
      return res.json(deleted);
    } catch (error) {
      next(error);
    }
  }

  async updated(req, res, next) {
    try {
      const { email, nick } = req.body;

      userValidation.email(email);
      userValidation.nick(nick);
  
      const updated = await userService.updated({ email, nick });
      return res.json(updated)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController;
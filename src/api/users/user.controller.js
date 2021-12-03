const express = require("express");
// const { wrap } = require("../../lib/wrap");
const UserRepository = require("../../repositories/user.repository");
const UserService = require("../../services/user.service");
const { BadRequestException } = require("../../common/exceptions");

const userService = new UserService(new UserRepository());

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
      const user = await userService.signUp({email, password, nick});
      return res.json(user);
    } catch (error) {
      next(error)
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw new BadRequestException("Email is required.");
      }
  
      if (!password) {
        throw new BadRequestException("Password is required.");
      } else if (password.length < 8 || password.length > 16) {
        throw new BadRequestException("Password must be 8-16 characters long.");
      }
  
      const token = await userService.login({ email, password });
      return res.json(token);
    } catch (error) {
      next(error)
    }
  }

  async deleted(req, res, next) {
    try {
      const { email } = req.body;
    
      if (!email) {
        throw new BadRequestException("Email is required.");
      }
  
      const deleted = await userService.deleted({ email });
      return res.json(deleted);
    } catch (error) {
      next(error);
    }
  }

  async updated(req, res, next) {
    try {
      const { email, nick } = req.body;

      if (!email) {
        throw new BadRequestException("Email is required.");
      }
  
      if (!nick) {
        throw new BadRequestException("Nick is required.");
      }
  
      const updated = await userService.updated({ email, nick });
      return res.json(updated)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController;
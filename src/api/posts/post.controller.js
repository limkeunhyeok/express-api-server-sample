const express = require("express");

const PostRepository = require("../../repositories/post.repository");
const PostService = require("../../services/post.service");
const PostValidation = require("./post.validation");

const postService = new PostService(new PostRepository());
const postValidation = new PostValidation();

class PostController {
  constructor() {
    this.path = "/posts";
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    const router = express.Router();
    
    router
      .post("/", this.create)
      .get("/", this.readAll)
      .get("/:postId", this.readOne)
      .put("/:postId", this.updated)
      .delete("/:postId", this.deleted)
    
    this.router.use(this.path, router);
  }

  create(req, res, next) {
    try {

    } catch (error) {
      next(error)
    } 
  }

  readAll(req, res, next) {
    try {

    } catch (error) {
      next(error)
    }
  }

  readOne(req, res, next) {
    try {

    } catch (error) {
      next(error)
    }
  }

  updated(req, res, next) {
    try {

    } catch (error) {
      next(error)
    }
  }

  deleted(req, res, next) {
    try {

    } catch (error) {
      next(error)
    }
  }
}

module.exports = PostController;
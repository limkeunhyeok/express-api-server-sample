const express = require("express");
const path = require("path");

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
      .get("/", this.read)
      // .get("/:postId", this.readOne)
      .put("/:postId", this.updated)
      .delete("/:postId", this.deleted)
    
    this.router.use(this.path, router);
  }

  async create(req, res, next) {
    try {
      const { email, title, content } = req.body;

      postValidation.title(title);
      postValidation.content(content);

      const post = await postService.create({ email, title, content });
      return res.json(post);
    } catch (error) {
      next(error)
    } 
  }

  async read(req, res, next) {
    try {
      let posts;
      const { postId } = req.query;
      if (postId) {
        posts = await postService.findByPostId(postId);
      } else {
        posts = await postService.findAll();
      }
      return res.json(posts);
    } catch (error) {
      next(error)
    }
  }

  async updated(req, res, next) {
    try {
      const postId = path.parse(req.params.postId).base;
      const { title, content } = req.body;
      const updated = await postService.updated({ postId, title, content });
      return res.json(updated); 
    } catch (error) {
      next(error)
    }
  }

  async deleted(req, res, next) {
    try {
      const postId = path.parse(req.params.postId).base;
      const deleted = await postService.deleted({ postId });
      return res.json(deleted);
    } catch (error) {
      next(error)
    }
  }
}

module.exports = PostController;
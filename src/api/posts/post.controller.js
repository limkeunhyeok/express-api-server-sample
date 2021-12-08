const express = require("express");
const path = require("path");

const PostRepository = require("../../repositories/post.repository");
const PostService = require("../../services/post.service");
const PostValidation = require("./post.validation");
const { wrap } = require("../../lib/wrap");

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
      .post("/", wrap(this.create))
      .get("/", wrap(this.read))
      .put("/", wrap(this.updated))
      .delete("/", wrap(this.deleted))
    
    this.router.use(this.path, router);
  }

  async create(req, res, next) {
    const { title, content } = req.body;
    const { user } = res.locals;
    
    postValidation.user(user);
    postValidation.title(title);
    postValidation.content(content);

    const { userId } = user;
    const post = await postService.create({ user_id: userId, title, content });
    return post;
  }

  async read(req, res, next) {
    const { user } = res.locals;
  
    postValidation.user(user);
    
    let posts;
    const { postId } = req.query;
    if (postId) {
      posts = await postService.findByPostId({ postId });
    } else {
      posts = await postService.findAll();
    }
    return posts;
  }

  async updated(req, res, next) {
    const { postId } = req.query;
    postValidation.postId(postId);

    const { title, content } = req.body;
    postValidation.title(title);
    postValidation.content(content);

    const updated = await postService.updated({ postId, title, content });
    return { updated };
  }

  async deleted(req, res, next) {
    const { postId } = req.query;
    postValidation.postId(postId);

    const deleted = await postService.deleted({ postId });
    return { deleted }
  }
}

module.exports = PostController;
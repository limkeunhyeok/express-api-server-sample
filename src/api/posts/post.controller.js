const express = require("express");
const path = require("path");

const PostValidation = require("./post.validation");
const { PostRepository, CommentRepository } = require("../../repositories");
const { PostService } = require("../../services");
const { wrap } = require("../../lib/wrap");

const postService = new PostService(new PostRepository(), new CommentRepository());
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
      .get("/", wrap(this.readAll))
      .get("/:slug", wrap(this.readOneBySlug))
      .put("/:slug", wrap(this.updated))
      .delete("/:slug", wrap(this.deleted))
    
    this.router.use(this.path, router);
  }

  async create(req, res, next) {
    const { categoryId, title, content } = req.body;
    const { user } = res.locals;
    
    postValidation
      .user(user)
      .title(title)
      .content(content);

    const { userId } = user;
    const post = await postService.create({ userId, categoryId, title, content });
    return post;
  }

  async readAll(req, res, next) {
    const { user } = res.locals;
  
    postValidation
      .user(user);
    
    const posts = await postService.findAll();
    return posts;
  }

  async readOneBySlug(req, res, next) {
    const { user } = res.locals;
    const slug = path.parse(req.params.slug).base;
  
    postValidation
      .user(user);
    
    const post = await postService.findBySlug({ slug });
    return post;
  }

  async updated(req, res, next) {
    const { title, content } = req.body;
    const { user } = res.locals;
    const slug = path.parse(req.params.slug).base;

    postValidation
      .user(user)
      .title(title)
      .content(content);

    const { userId } = user;
    const updated = await postService.updated({ userId, title, slug, content });
    return { updated };
  }

  async deleted(req, res, next) {
    const { user } = res.locals;
    const slug = path.parse(req.params.slug).base;

    postValidation
      .user(user);

    const { userId } = user;
    const deleted = await postService.deleted({ userId, slug });
    return { deleted }
  }
}

module.exports = PostController;
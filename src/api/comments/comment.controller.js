const express = require("express");

const CommentValidation = require("./comment.validation");
const { CommentRepository } = require("../../repositories");
const { CommentService } = require("../../services");
const { wrap } = require("../../lib/wrap");

const commentService = new CommentService(new CommentRepository());
const commentValidation = new CommentValidation();

class CommentController {
  constructor() {
    this.path = "/comments";
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
    const { postId, content } = req.body;
    const { user } = res.locals;
    
    commentValidation
      .user(user)
      .content(content);

    const { userId } = user;
    const comment = await commentService.create({ userId, postId, content });
    return comment;
  }

  async read(req, res, next) {
    const { postId } = req.body;
    const { user } = res.locals;
  
    commentValidation
      .user(user);
    
    const comments = await commentService.findByPostId({ postId });
    return comments;
  }

  async deleted(req, res, next) {
    const { commentId } = req.body;
    const { user } = res.locals;

    commentValidation
      .user(user);

    const deleted = await commentService.deleted({ commentId });
    return { deleted }
  }
}

module.exports = CommentController;
const express = require("express");
const path = require("path");

const CommentValidation = require("./comment.validation");
const { CommentRepository, PostRepository } = require("../../repositories");
const { CommentService } = require("../../services");
const { wrap } = require("../../lib/wrap");

const commentService = new CommentService(new CommentRepository(), new PostRepository());
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
      .post("/:postId", wrap(this.create))
      .get("/", wrap(this.readAllCommentsFromUsers))
      .get("/:postId", wrap(this.readAllCommentsOnThePost))
      .delete("/:commentId", wrap(this.deleted))
    
    this.router.use(this.path, router);
  }

  async create(req, res, next) {
    const { content } = req.body;
    const { user } = res.locals;
    const postId = path.parse(req.params.postId).base;
    
    commentValidation
      .user(user)
      .content(content);

    const { userId } = user;
    const comment = await commentService.create({ userId, postId, content });
    return comment;
  }

  async readAllCommentsFromUsers(req, res, next) {
    const { user } = res.locals;
    
    commentValidation
      .user(user);
    
    const { userId } = user;
    const comments = await commentService.findByUserIdAndSortByPostId({ userId });
    return comments;
  }

  async readAllCommentsOnThePost(req, res, next) {
    const { user } = res.locals;
    const postId = path.parse(req.params.postId).base;
  
    commentValidation
      .user(user);
    
    const comments = await commentService.findByPostId({ postId });
    return comments;
  }

  async deleted(req, res, next) {
    const { user } = res.locals;
    const commentId = path.parse(req.params.commentId).base;

    commentValidation
      .user(user);

    const { userId } = user;
    const deleted = await commentService.deleted({ commentId, userId });
    return { deleted }
  }
}

module.exports = CommentController;
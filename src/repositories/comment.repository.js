const { CommentModel } = require("../models");
const { CommentEntity } = require("../common/entities");

class CommentRepository {
  constructor() {
    this.Comment = CommentModel;
  }

  async create(commentInfo) {
    const comment = new this.Comment(commentInfo);
    await comment.save();
    return CommentEntity.fromJson(comment);
  }

  async findByUserId(userId) {
    const comments = await this.Comment.find({ userId });
    const result = comments.map(comment => CommentEntity.fromJson(comment));
    return result;
  }

  async findByPostId(postId) {
    const comment = await this.Comment.findOne({ postId });
    return CommentEntity.fromJson(comment);
  }

  async findAll() {
    const comments = await this.Comment.find({});
    const result = comments.map(comment => CommentEntity.fromJson(comment))
    return result;
  }

  async deleteByCommentId(commentId) {
    const result = await this.Comment.deleteOne({ id: commentId });
    return result;
  }
}

module.exports = CommentRepository;
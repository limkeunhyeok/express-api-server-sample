const { BadRequestException } = require("../common/exceptions");

class CommentService {
  constructor(commentRepository) {
    this.commentRepository = commentRepository;
  }

  async create({ userId, postId, content }) {
    const comment = await this.commentRepository.create({
      userId,
      postId,
      content
    });
    return comment;
  }

  async findByUserId({ userId }) {
    const comments = await this.commentRepository.findByUserId(userId);
    return comments
  }

  async findByPostId({ postId }) {
    const comments = await this.commentRepository.findByPostId(postId);
    return comments;
  }

  async findAll() {
    const comments = await this.commentRepository.findAll();
    return comments;
  }


  async deleted({ commentId }) {
    const comment = await this.commentRepository.findByCommentId(commentId);
    if (!comment) {
      throw new BadRequestException("Post does not exist.");
    }

    const deleted = await this.commentRepository.deleteByCommentId(commentId);
    return deleted;
  }

}

module.exports = CommentService;
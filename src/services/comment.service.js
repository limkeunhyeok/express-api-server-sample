const { BadRequestException, UnauthorizedException } = require("../common/exceptions");

class CommentService {
  constructor(commentRepository, postRepository) {
    this.commentRepository = commentRepository;
    this.postRepository = postRepository;
  }

  async create({ userId, postId, content }) {
    const comment = await this.commentRepository.create({
      userId,
      postId,
      content
    });
    return comment;
  }

  async findByUserIdAndSortByPostId({ userId }) {
    const comments = await this.commentRepository.findByUserId(userId);
    const postIdSet = new Set(comments.map(comment => comment.postId.toString()))
    
    let result = [];
    for (const postId of postIdSet) {
      const post = await this.postRepository.findByPostId(postId);
      const data = {
        postId,
        title: post.title,
        comments: comments.filter((comment) => comment.postId.toString() === postId),
      }
      result = [...result, data];
    }
    return result;
  }

  async findByPostId({ postId }) {
    const comments = await this.commentRepository.findByPostId(postId);
    return comments;
  }

  async deleted({ commentId, userId }) {
    const comment = await this.commentRepository.findByCommentId(commentId);
    if (!comment) {
      throw new BadRequestException("Comment does not exist.");
    }

    if (comment.userId.toString() !== userId) {
      throw new UnauthorizedException("Access is denied.");
    }

    const deleted = await this.commentRepository.deleteByCommentId(commentId);
    return deleted;
  }

}

module.exports = CommentService;
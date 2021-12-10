const { BadRequestException, UnauthorizedException } = require("../../common/exceptions");

class PostValidation {
  user(user) {
    if (!user) {
      throw new UnauthorizedException("Access is denied.");
    }
    return this;
  }

  title(title) {
    if (!title) {
      throw new BadRequestException("Title is required.")
    }
    return this;
  }

  content(content) {
    if (!content) {
      throw new BadRequestException("Content is required.");
    }
    return this;
  }

  postId(postId) {
    if (!postId) {
      throw new BadRequestException("Post id is required.");
    }
    return this;
  }
}

module.exports = PostValidation;
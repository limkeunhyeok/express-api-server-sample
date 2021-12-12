const { BadRequestException, UnauthorizedException } = require("../../common/exceptions");

class CommentValidation {
  user(user) {
    if (!user) {
      throw new UnauthorizedException("Access is denied.");
    }
    return this;
  }

  content(content) {
    if (!content) {
      throw new BadRequestException("Content is required.")
    }
    return this;
  }
}

module.exports = CommentValidation;
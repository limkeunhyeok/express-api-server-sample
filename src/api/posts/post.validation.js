const { BadRequestException, UnauthorizedException } = require("../../common/exceptions");

class PostValidation {
  user(user) {
    if (!user) {
      throw new UnauthorizedException("Access is denied.");
    }
  }

  title(title) {
    if (!title) {
      throw new BadRequestException("Title is required.")
    }
  }

  content(content) {
    if (!content) {
      throw new BadRequestException("Content is required.");
    }
  }
}

module.exports = PostValidation;
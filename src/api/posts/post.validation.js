const { BadRequestException } = require("../../common/exceptions");

class PostValidation {
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
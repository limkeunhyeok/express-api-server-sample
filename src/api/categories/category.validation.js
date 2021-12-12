const { BadRequestException, UnauthorizedException } = require("../../common/exceptions");

class CategoryValidation {
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
}

module.exports = CategoryValidation;
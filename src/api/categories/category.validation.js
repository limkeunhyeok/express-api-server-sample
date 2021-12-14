const { BadRequestException, UnauthorizedException } = require("../../common/exceptions");
const regexp = require("../../lib/regexp");

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

    if (title.length > 16) {
      throw new BadRequestException("Title is invalid.");
    }

    const { checkEnglish } = regexp;
    if (!checkEnglish.test(title)) {
      throw new BadRequestException("Title is invalid.");
    }
    return this;
  }
}

module.exports = CategoryValidation;
const { BadRequestException } = require("../../common/exceptions");

class UserValidation {
  email(email) {
    if (!email) {
      throw new BadRequestException("Email is required.")
    }

    const pattern = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
    if (!pattern.test(email)) {
      throw new BadRequestException("Email is invalid.");
    }
  }

  password(password) {
    if (!password) {
      throw new BadRequestException("Password is required.");
    } else if (password.length < 8 || password.length > 16) {
      throw new BadRequestException("Password must be 8-16 characters long.");
    }
  }

  nick(nick) {
    if (!nick) {
      throw new BadRequestException("Nick is required.");
    }
  }
}

module.exports = UserValidation;
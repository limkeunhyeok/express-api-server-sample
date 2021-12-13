const { BadRequestException, UnauthorizedException } = require("../../common/exceptions");
const regexp = require("../../lib/regexp");

class UserValidation {
  email(email) {
    if (!email) {
      throw new BadRequestException("Email is required.")
    }

    const pattern = regexp.email;
    if (!pattern.test(email)) {
      throw new BadRequestException("Email is invalid.");
    }
    return this;
  }

  password(password) {
    if (!password) {
      throw new BadRequestException("Password is required.");
    }
    
    const pattern = regexp.password;
    if (!pattern.test(password)) {
      throw new BadRequestException("Password is invalid.");
    }
    return this;
  }

  nick(nick) {
    if (!nick) {
      throw new BadRequestException("Nick is required.");
    }

    const pattern = regexp.nick;
    if (!pattern.test(nick)) {
      throw new BadRequestException("Nick is invalid.");
    }
    return this;
  }

  user(user) {
    if (!user) {
      throw new UnauthorizedException("Access is denied.");
    }
    return this;
  }
}

module.exports = UserValidation;
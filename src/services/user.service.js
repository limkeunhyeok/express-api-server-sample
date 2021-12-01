const bcrypt = require("bcrypt");
const { BadRequestException } = require("../common/exceptions");
const jwt = require("../lib/jwt");

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async signUp({ email, password, nick }) {
    const hasEmail = this.userRepository.findByEmail(email);

    if (hasEmail) {
      throw new BadRequestException("Email is already registered.");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      email,
      encryptedPassword,
      nick
    });
    return user;
  }

  async login({ email, password }) {
    const user = this.userRepository.findByEmail(email);
    if (!user) {
      throw new BadRequestException("Email or password is incorrect.");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new BadRequestException("Email or password is incorrect.");
    }

    const token = jwt.create({
      userId: user.id,
      email: user.email,
      nick: user.nick
    })
    return token;
  }

  updated({ email, nick }) {
    const user = this.userRepository.findByEmail(email);
    if (!user) {
      throw new BadRequestException("Email does not exist.");
    }
    
    const updated = this.userRepository.updateByEmail(email, ncik);
    return updated;
  }

  deleted({ email }) {
    const user = this.userRepository.findByEmail(email);
    if (!user) {
      throw new BadRequestException("Email does not exist.");
    }
    
    const deleted = this.userRepository.deleteByEmail(email);
    return deleted;
  }
}

module.exports = UserService;
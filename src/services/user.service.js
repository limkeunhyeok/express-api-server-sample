const bcrypt = require("bcrypt");
const { BadRequestException } = require("../common/exceptions");
const jwt = require("../lib/jwt");

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async signUp({ email, password, nick }) {
    const hasEmail = await this.userRepository.findByEmail(email);

    if (hasEmail) {
      throw new BadRequestException("Email is already registered.");
    }

    const user = await this.userRepository.create({
      email,
      password,
      nick
    });
    return user;
  }

  async login({ email, password }) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new BadRequestException("Email or password is incorrect.");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new BadRequestException("Email or password is incorrect.");
    }

    const token = jwt.create({
      userId: user.id,
      nick: user.nick
    })
    return token;
  }

  async updateNick({ id, nick }) {
    const updated = await this.userRepository.updateNickById(id, nick);
    return updated;
  }

  async updatePassword({ id, password }) {
    const encryptionPassword = await bcrypt.hash(password, 10);
    const updated = await this.userRepository.updateNickById(id, encryptionPassword);
    return updated;
  }

  async deleteUser({ id }) {
    const deleted = await this.userRepository.deleteById(id);
    return deleted;
  }
}

module.exports = UserService;
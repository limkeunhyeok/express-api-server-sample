const UserModel = require("../models/user.model");

class UserRepository {
  constructor() {
    this.User = UserModel;
  }

  async create(userInfo) {
    const user = new this.User(userInfo);
    return await user.save();
  }

  async findByEmail(email) {
    return await this.User.findOne({ email });
  }

  async findAll() {
    return await this.User.find({});
  }

  async updateByEmail(email, nick) {
    return await this.User.findOneAndUpdate({ email }, { nick });
  }

  async deleteByEmail(email) {
    return await this.User.deleteOne({ email });
  }
}

module.exports = UserRepository;
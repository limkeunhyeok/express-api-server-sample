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

  findAll() {
    return this.User.find({});
  }

  updateByEmail(email, nick) {
    return this.User.findOneAndUpdate({ email }, { nick });
  }

  deleteByEmail(email) {
    return this.User.deleteOne({ email });
  }
}

module.exports = UserRepository;
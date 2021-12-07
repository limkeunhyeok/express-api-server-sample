const UserModel = require("../models/user.model");
const UserEntity = require("../common/entities/user.entity");

class UserRepository {
  constructor() {
    this.User = UserModel;
  }

  async create(userInfo) {
    const user = new this.User(userInfo);
    await user.save();
    return user;
  }

  async findByEmail(email) {
    const user = await this.User.findOne({ email });
    return UserEntity.fromJson(user);
  }

  async findAll() {
    const user = await this.User.find({});
    return UserEntity.fromJson(user);
  }

  async updateByEmail(email, nick) {
    const user = await this.User.findOneAndUpdate({ email }, { nick });
    return UserEntity.fromJson(user);
  }

  async deleteByEmail(email) {
    const result = await this.User.deleteOne({ email });
    return result;
  }
}

module.exports = UserRepository;
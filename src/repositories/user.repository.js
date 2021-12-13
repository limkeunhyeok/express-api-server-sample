const { UserModel } = require("../models");
const { UserEntity } = require("../common/entities");

class UserRepository {
  constructor() {
    this.User = UserModel;
  }

  async create(userInfo) {
    const user = new this.User(userInfo);
    await user.save();
    return UserEntity.fromJson(user);
  }

  async findByEmail(email) {
    const user = await this.User.findOne({ email });
    return UserEntity.fromJson(user);
  }

  async findById(id) {
    const user = await this.User.findOne({ id });
    return UserEntity.fromJson(user);
  }

  async findAll() {
    const user = await this.User.find({});
    return UserEntity.fromJson(user);
  }

  async updateNickById(id, nick) {
    const user = await this.User.findOneAndUpdate({ id }, { nick }, { new: true });
    return UserEntity.fromJson(user);
  }

  async updatePasswordById(id, password) {
    const user = await this.User.findOneAndUpdate({ id }, { password }, { new: true });
    return UserEntity.fromJson(user);
  }

  async deleteById(id) {
    const result = await this.User.deleteOne({ id });
    return result;
  }
}

module.exports = UserRepository;
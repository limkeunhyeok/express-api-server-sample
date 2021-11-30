const UserModel = require("../models/user.model");

class UserRepository {
  constructor() {
    this.User = UserModel;
  }

  create(userInfo) {
    const user = new this.User(userInfo);
    return user.save();
  }

  findByEmail(email) {
    return this.User.findOne({ email });
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
class UserEntity {
  constructor(id, email, password, nick) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.nick = nick;
  }

  static fromJson(json) {
    if (!json) return null;
    return new UserEntity(
      json.id,
      json.email,
      json.nick
    );
  }

  toJson() {
    return {
      id: this.id,
      email: this.email,
      nick: this.nick,
    };
  }
}

module.exports = UserEntity;

class PostEntity {
  constructor(id, userId, title, content) {
    this.id = id,
    this.userId = userId;
    this.title = title;
    this.content = content;
  }

  static fromJson(json) {
    if (!json) return null;
    return new UserEntity(
      json._id,
      json.userId,
      json.title,
      json.content
    );
  }

  toJson() {
    return {
      id: this.id,
      userId: this.userId,
      title: this.title,
      content: this.content,
    };
  }
}

module.exports = PostEntity

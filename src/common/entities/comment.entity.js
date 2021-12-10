class CommentEntity {
  constructor(id, userId, postId, content) {
    this.id = id;
    this.userId = userId;
    this.postId = postId;
    this.content = content;
  }

  static fromJson(json) {
    if (!json) return null;
    return new CommentEntity(
      json.id,
      json.userId,
      json.postId,
      json.content,
    );
  }

  toJson() {
    return {
      id: this.id,
      userId: this.userId,
      postId: this.postId,
      content: this.content,
    };
  }
}

module.exports = CommentEntity;

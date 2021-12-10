class PostEntity {
  constructor(id, userId, categoryId, title, slug, content) {
    this.id = id;
    this.userId = userId;
    this.categoryId = categoryId;
    this.title = title;
    this.slug = slug;
    this.content = content;
  }

  static fromJson(json) {
    if (!json) return null;
    return new PostEntity(
      json.id,
      json.userId,
      json.categoryId,
      json.title,
      json.slug,
      json.content,
    );
  }

  toJson() {
    return {
      id: this.id,
      userId: this.userId,
      categoryId: this.categoryId,
      title: this.title,
      slug: this.slug,
      content: this.content,
    };
  }
}

module.exports = PostEntity;

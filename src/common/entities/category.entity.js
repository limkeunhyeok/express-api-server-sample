class CategoryEntity {
  constructor(id, title) {
    this.id = id;
    this.title = title;
  }

  static fromJson(json) {
    if (!json) return null;
    return new CategoryEntity(
      json.id,
      json.title,
    );
  }

  toJson() {
    return {
      id: this.id,
      title: this.title,
    };
  }
}

module.exports = CategoryEntity;

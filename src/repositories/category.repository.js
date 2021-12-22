const { CategoryModel } = require("../models");
const { CategoryEntity } = require("../common/entities");

class CategoryRepository {
  constructor() {
    this.Category = CategoryModel;
  }

  async create(categoryInfo) {
    const category = new this.Category(categoryInfo);
    await category.save();
    return CategoryEntity.fromJson(category);
  }

  async findByCategoryId(categoryId) {
    const category = await this.Category.findOne({ _id: categoryId });
    return CategoryEntity.fromJson(category);
  }

  async findByTitle(categoryTitle) {
    const category = await this.Category.findOne({ title: categoryTitle.title });
    return CategoryEntity.fromJson(category);
  }

  async findAll() {
    const categories = await this.Category.find({});
    const result = categories.map(category => CategoryEntity.fromJson(category))
    return result;
  }

  async updateByCategoryId(categoryId, categoryTitle) {
    const category = await this.Category.findOneAndUpdate({ _id: categoryId }, { title: categoryTitle }, { new: true });
    return CategoryEntity.fromJson(category);
  }

  async deleteByCategoryId(categoryId) {
    const result = await this.Category.deleteOne({ _id: categoryId });
    return result;
  }
}

module.exports = CategoryRepository;
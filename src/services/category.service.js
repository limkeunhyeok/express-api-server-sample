const { BadRequestException } = require("../common/exceptions");

class CategoryService {
  constructor(categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  async create({ title }) {
    const category = await this.categoryRepository.create({
      title,
    });
    return category;
  }

  async findByCategoryId({ categoryId }) {
    const category = await this.categoryRepository.findByCategoryId(categoryId);
    return category
  }

  async findByTitle({ title }) {
    const category = await this.categoryRepository.findByTitle(title);
    return category;
  }

  async findAll() {
    const categories = await this.categoryRepository.findAll();
    return categories;
  }

  async updated({ categoryId, title }) {
    const category = await this.categoryRepository.findByCategoryId(categoryId);
    if (!category) {
      throw new BadRequestException("Post does not exist.");
    }

    const updated = await this.categoryRepository.updateByCategoryId(categoryId, title);
    return updated;
  }

  async deleted({ categoryId }) {
    const category = await this.categoryRepository.findByCategoryId(categoryId);
    if (!category) {
      throw new BadRequestException("Post does not exist.");
    }

    const deleted = await this.categoryRepository.deleteByCategoryId(categoryId);
    return deleted;
  }

}

module.exports = CategoryService;
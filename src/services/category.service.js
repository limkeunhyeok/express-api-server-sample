const { BadRequestException } = require("../common/exceptions");

class CategoryService {
  constructor(categoryRepository, postRepository) {
    this.categoryRepository = categoryRepository;
    this.postRepository = postRepository;
  }

  async create({ title }) {
    const hasCategory = await this.categoryRepository.findByTitle(title);
    if (!hasCategory) {
      throw new BadRequestException("Category does not exist.");
    }

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

  async findAllPostsByCategoryID({ categoryId }) {
    const category = await this.categoryRepository.findByCategoryId(categoryId);
    if (!category) {
      throw new BadRequestException("Category does not exist.");
    }

    const posts = await this.postRepository.findByCategoryId(categoryId);
    return { category, posts }
  }

  async updated({ categoryId, title }) {
    const category = await this.categoryRepository.findByCategoryId(categoryId);
    if (!category) {
      throw new BadRequestException("Category does not exist.");
    }

    const updated = await this.categoryRepository.updateByCategoryId(categoryId, title);
    return updated;
  }

  async deleted({ categoryId }) {
    const category = await this.categoryRepository.findByCategoryId(categoryId);
    if (!category) {
      throw new BadRequestException("Category does not exist.");
    }

    await this.postRepository.deleteByCategoryId(categoryId);
    const deleted = await this.categoryRepository.deleteByCategoryId(categoryId);
    return deleted;
  }
}

module.exports = CategoryService;
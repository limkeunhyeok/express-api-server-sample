const { PostModel } = require("../models");
const { PostEntity } = require("../common/entities");

class PostRepository {
  constructor() {
    this.Post = PostModel;
  }

  async create(postInfo) {
    const post = new this.Post(postInfo);
    await post.save();
    return PostEntity.fromJson(post);
  }

  async findByUserId(userId) {
    const posts = await this.Post.find({ userId });
    const result = posts.map(post => PostEntity.fromJson(post));
    return result;
  }

  async findByPostId(postId) {
    const post = await this.Post.findOne({ id: postId });
    return PostEntity.fromJson(post);
  }

  async findBySlug(slug) {
    const post = await this.Post.findOne({ slug });
    return PostEntity.fromJson(post);
  }

  async findByCategoryId(categoryId) {
    const posts = await this.Post.find({ categoryId });
    const result = posts.map(post => PostEntity.fromJson(post));
    return result;
  }

  async findAll() {
    const posts = await this.Post.find({});
    const result = posts.map(post => PostEntity.fromJson(post))
    return result;
  }

  async updateBySlug(slug, title, content) {
    const post = await this.Post.findOneAndUpdate({ slug }, { title, content }, { new: true });
    return PostEntity.fromJson(post);
  }

  async deleteBySlug(slug) {
    const result = await this.Post.deleteOne({ slug });
    return result;
  }

  async deleteByCategoryId(categoryId) {
    const result = await this.Post.deleteMany({ categoryId });
    return result;
  }
}

module.exports = PostRepository;
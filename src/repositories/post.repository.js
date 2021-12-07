const PostModel = require("../models/post.model");
const PostEntity = require("../common/entities/post.entity");

class PostRepository {
  constructor() {
    this.Post = PostModel;
  }

  async create(postInfo) {
    const post = new this.Post(postInfo);
    await post.save();
    return post;
  }

  async findByUserId(userId) {
    const post = await this.Post.find({ user_id: userId })
    return PostEntity.fromJson(post);
  }

  async findByPostId(postId) {
    const post = await this.Post.findOne({ _id: postId });
    return PostEntity.fromJson(post);
  }

  async findAll() {
    const posts = await this.Post.find({});
    const result = posts.map(post => PostEntity.fromJson(post))
    return result;
  }

  async updateByPostId(postId, data) {
    const post = await this.Post.findOneAndUpdate({ _id: postId }, data);
    return PostEntity.fromJson(post);
  }

  async deleteByPostId(postId) {
    const result = await this.Post.deleteOne({ _id: postId });
    return result;
  }
}

module.exports = PostRepository;
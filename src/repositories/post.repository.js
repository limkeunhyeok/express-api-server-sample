const PostModel = require("../models/post.model");

class PostRepository {
  constructor() {
    this.Post = PostModel;
  }

  async create(postInfo) {
    const post = new this.Post(postInfo);
    return await post.save();
  }

  async findByUserId(userId) {
    return await this.Post.find({ user_id: userId })
  }

  async findByPostId(postId) {
    return await this.Post.findOne({ _id: postId });
  }

  async findAll() {
    return await this.Post.find({});
  }

  async updateByPostId(postId, data) {
    return await this.Post.findOneAndUpdate({ _id: postId }, data);
  }

  async deleteByPostId(postId) {
    return await this.Post.deleteOne({ _id: postId });
  }
}

module.exports = PostRepository;
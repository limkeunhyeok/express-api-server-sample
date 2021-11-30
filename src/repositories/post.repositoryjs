const PostModel = require("../models/post.model");

class PostRepository {
  constructor() {
    this.Post = PostModel;
  }

  create(postInfo) {
    const post = new this.Post(postInfo);
    return post.save();
  }

  findByUserId(userId) {
    return this.Post.find({ user_id: userId })
  }

  findByPostId(postId) {
    return this.Post.findOne({ _id: postId });
  }

  findAll() {
    return this.Post.find({});
  }

  updateByPostId(postId, data) {
    return this.Post.findOneAndUpdate({ _id: postId }, data);
  }

  deleteByPostId(postId) {
    return this.Post.deleteOne({ _id: postId });
  }
}

module.exports = PostRepository;
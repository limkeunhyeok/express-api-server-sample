const bcrypt = require("bcrypt");
const { BadRequestException } = require("../common/exceptions");
const jwt = require("../lib/jwt");

class PostService {
  constructor(postRepository, userRepository) {
    this.postRepository = postRepository;
  }

  async create({ user_id, title, content }) {
    const post = await this.postRepository.create({
      user_id,
      title,
      content
    });
    return post;
  }

  async findByUserId({ userId }) {
    const posts = await this.postRepository.findByUserId(userId);
    return posts
  }

  async findByPostId({ postId }) {
    const post = await this.postRepository.findByPostId(postId);
    return post;
  }

  async findAll() {
    const posts = await this.postRepository.findAll();
    return posts;
  }

  async updated({ postId, title, content }) {
    const post = await this.postRepository.findByPostId(postId);
    if (!post) {
      throw new BadRequestException("Post does not exist.");
    }

    const updated = await this.postRepository.updateByPostId(postId, {
      title,
      content
    });
    return updated;
  }

  async deleted({ postId }) {
    const post = await this.postRepository.findByPostId(postId);
    if (!post) {
      throw new BadRequestException("Post does not exist.");
    }

    const deleted = await this.postRepository.deleteByPostId(postId);
    return deleted;
  }

}

module.exports = PostService;
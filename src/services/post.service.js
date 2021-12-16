const shortid = require("shortid");

const { BadRequestException, UnauthorizedException } = require("../common/exceptions");

class PostService {
  constructor(postRepository, commentRepository) {
    this.postRepository = postRepository;
    this.commentRepository = commentRepository;
  }

  async create({ userId, categoryId, title, content }) {
    const slug = `${title.replace(/\s/gi, "-")}-${shortid.generate()}`;
    const post = await this.postRepository.create({
      userId,
      categoryId,
      title,
      slug,
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
  
  async findBySlug({ slug }) {
    const post = await this.postRepository.findBySlug(slug);
    return post;
  }

  async findByCategoryId({ categoryId }) {
    const posts = await this.postRepository.findBySlug(categoryId);
    return posts;
  }

  async findAll() {
    const posts = await this.postRepository.findAll();
    return posts;
  }

  async updated({ userId, title, slug, content }) {
    const post = await this.postRepository.findBySlug(slug);
    if (!post) {
      throw new BadRequestException("Post does not exist.");
    }

    if (post.userId !== userId) {
      throw new UnauthorizedException("Access is denied.");
    }

    const updated = await this.postRepository.updateBySlug(slug, title, content);
    return updated;
  }

  async deleted({ userId, slug }) {
    const post = await this.postRepository.findBySlug(slug);
    if (!post) {
      throw new BadRequestException("Post does not exist.");
    }

    if (post.userId !== userId) {
      throw new UnauthorizedException("Access is denied.");
    }

    await this.commentRepository.deleteByPostId(post.id);
    const deleted = await this.postRepository.deleteBySlug(slug);
    return deleted;
  }
}

module.exports = PostService;
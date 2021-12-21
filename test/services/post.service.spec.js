require("dotenv").config();

const mocha = require("mocha");
const assert = require("assert");

const { PostRepository, UserRepository, CategoryRepository, CommentRepository } = require("../../src/repositories");
const { PostService } = require("../../src/services");

const { BadRequestException } = require("../../src/common/exceptions")

const { getPostData, getUserData, getCategoryData } = require("../utils");

const { describe, it, before } = mocha;

describe("post service test", () => {
  const postRepository = new PostRepository();
  const userRepository = new UserRepository();
  const categoryRepository = new CategoryRepository();
  const commentRepository = new CommentRepository();
  const postService = new PostService(postRepository, commentRepository);
  
  let user;
  let category;
  let post;
  before("set create user and cateogry", async () => {
    const userData = getUserData();
    const categoryData = getCategoryData();

    user = await userRepository.create(userData);
    category = await categoryRepository.create(categoryData);
  });

  describe("create test", () => {
    it("success: create post", async () => {
      const postData = getPostData();
      const params = {
        userId: user.id,
        categoryId: category.id,
        title: postData.title,
        content: postData.content,
      };

      const result = await postService.create(params);
      post = result;
      assert.deepEqual(result.title, postData.title);
      assert.deepEqual(result.content, postData.content);
    });
  });

  describe("find by user id test", () => {
    it("success: find all posts by user id", async () => {
      const params = {
        userId: user.id
      };

      const result = await postService.findByUserId(params);
      assert.deepEqual(result.length, 1);
    });
  });

  describe("find by post id test", () => {
    it("success: find post by post id", async () => {
      const postId = post.id;
      const params = {
        postId,
      };

      const result = await postService.findByPostId(params);
      assert.deepEqual(result.userId.toString(), user.id);
      assert.deepEqual(result.id, post.id);
      assert.deepEqual(result.title, post.title);
      assert.deepEqual(result.content, post.content);
    });
  });

  describe("find all test", () => {
    it("success: find all posts", async () => {
      const result = await postService.findAll();
      assert.deepEqual(result.length, 1);
    });
  });

  describe("updated test", () => {
    it("success: updated post", async () => {
      const postData = getPostData();
      const params = {
        userId: user.id,
        title: postData.title,
        slug: post.slug,
        content: postData.content,
      };

      const result = await postService.updated(params);
      assert.deepEqual(result.id.toString(), post.id);
      assert.deepEqual(result.title, params.title);
      assert.deepEqual(result.content, params.content);
    });

    it("fail: post does not exist.", async () => {
      const postData = getPostData();
      const params = {
        userId: user.id,
        title: postData.title,
        slug: "test-slug",
        content: postData.content,
      };
      try {
        await postService.updated(params);
      } catch (error) {
        assert.deepEqual(error, new BadRequestException("Post does not exist."));
      };
    });
  });

  describe("deleted test", () => {
    it("success: deleted post", async () => {
      const params = {
        userId: user.id,
        slug: post.slug,
      };

      const result = await postService.deleted(params);
      assert.deepEqual(result.deletedCount, 1);
    });

    it("fail: post does not exist.", async () => {
      const params = {
        postId: "61b07d1cc532e5b567136b29",
      };
      try {
        await postService.deleted(params);
      } catch (error) {
        assert.deepEqual(error, new BadRequestException("Post does not exist."));
      };
    });
  });
});
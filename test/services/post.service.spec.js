require("dotenv").config();

const mocha = require("mocha");
const assert = require("assert");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const PostRepository = require("../../src/repositories/post.repository");
const PostService = require("../../src/services/post.service");
const UserRepository = require("../../src/repositories/user.repository");
const UserService = require("../../src/repositories/user.repository");

const { BadRequestException } = require("../../src/common/exceptions")

const { getPostData, getUserData } = require("../utils");

const { describe, it, before } = mocha;

describe("post service test", () => {
  const postRepository = new PostRepository();
  const postService = new PostService(postRepository);
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);
  
  let user;

  before("set create user", async () => {
    const userData = getUserData();
    user = await userService.create(userData);
  });

  describe("create test", () => {
    it("success: create post", async () => {
      const userId = user.id.toString();
      const postData = getPostData();
      const params = {
        user_id: userId,
        title: postData.title,
        content: postData.content,
      };

      const result = await postService.create(params);
      assert.deepEqual(result.title, postData.title);
      assert.deepEqual(result.content, postData.content);
    });
  });

  describe("find by user id test", () => {
    it("success: find all posts by user id", async () => {
      const userId = user.id.toString();
      const params = {
        userId,
      };

      const result = await postService.findByUserId(params);
      assert.deepEqual(result.length, 1);
    });
  });

  describe("find by post id test", () => {
    let post;
    before("set create post", async () => {
      const userId = user.id.toString();
      const postData = getPostData();
      const params = {
        user_id: userId,
        title: postData.title,
        content: postData.content,
      };

      post = await postService.create(params);
    });

    it("success: find post by post id", async () => {
      const userId = user.id.toString();
      const postId = post.id.toString();
      const params = {
        postId,
      };

      const result = await postService.findByPostId(params);
      assert.deepEqual(result.userId.toString(), userId);
      assert.deepEqual(result.id, post.id);
      assert.deepEqual(result.title, post.title);
      assert.deepEqual(result.content, post.content);
    });
  });

  describe("find all test", () => {
    it("success: find all posts", async () => {
      const result = await postService.findAll();
      assert.deepEqual(result.length, 11);
    });
  });

  describe("updated test", () => {
    let post;
    before("set create post", async () => {
      const userId = user.id.toString();
      const postData = getPostData();
      const params = {
        user_id: userId,
        title: postData.title,
        content: postData.content,
      };

      post = await postService.create(params);
    });

    it("success: updated post", async () => {
      const postData = getPostData();
      const params = {
        postId: post.id.toString(),
        title: postData.title,
        content: postData.content,
      };

      const result = await postService.updated(params);
      assert.deepEqual(result.id.toString(), params.postId);
      assert.deepEqual(result.title, params.title);
      assert.deepEqual(result.content, params.content);
    });

    it("fail: post does not exist.", async () => {
      const postData = getPostData();
      const params = {
        postId: "61b07d1cc532e5b567136b29",
        title: postData.title,
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
    let post;
    before("set create post", async () => {
      const userId = user.id.toString();
      const postData = getPostData();
      const params = {
        user_id: userId,
        title: postData.title,
        content: postData.content,
      };

      post = await postService.create(params);
    });

    it("success: deleted post", async () => {
      const params = {
        postId: post.id.toString(),
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
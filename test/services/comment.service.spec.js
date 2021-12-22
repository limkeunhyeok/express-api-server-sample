require("dotenv").config();

const mocha = require("mocha");
const assert = require("assert");
const shortid = require("shortid");

const { PostRepository, UserRepository, CategoryRepository, CommentRepository } = require("../../src/repositories");
const { CommentService } = require("../../src/services");

const { BadRequestException } = require("../../src/common/exceptions")

const { getPostData, getUserData, getCategoryData, getCommentData } = require("../utils");

const { describe, it, before } = mocha;

describe("comment service test", () => {
  const postRepository = new PostRepository();
  const userRepository = new UserRepository();
  const categoryRepository = new CategoryRepository();
  const commentRepository = new CommentRepository();
  const commentService = new CommentService(commentRepository, postRepository);

  let user;
  let category;
  let post;
  let comments
  before("set create user and cateogry and post", async () => {
    const userData = getUserData();
    const categoryData = getCategoryData();
    
    user = await userRepository.create(userData);
    category = await categoryRepository.create(categoryData);
    
    const postData = getPostData();
    postData.userId = user.id;
    postData.categoryId = category.id;
    postData.slug = `${postData.title.replace(/\s/gi, "-")}-${shortid.generate()}`;
    post = await postRepository.create(postData);
  });

  describe("create test", () => {
    it("success: create comment", async () => {
      const commentData = getCommentData();
      const params = {
        userId: user.id,
        postId: post.id,
        content: commentData.content,
      };

      const result = await commentService.create(params);
      comments = result;
      assert.deepEqual(result.content, params.content);
    });
  });

  describe("find by user id test", () => {
    it("success: find all comments by user id", async () => {
      const params = {
        userId: user.id
      };
      
      const result = await commentService.findByUserIdAndSortByPostId(params);
      assert.deepEqual(result[0].comments[0], comments);
    });
  });

  describe("find by post id test", () => {
    it("success: find all comments by user id", async () => {
      const params = {
        postId: post.id,
      };

      const result = await commentService.findByPostId(params);
      assert.deepEqual(result[0], comments);
    });
  });

  describe("deleted test", () => {
    it("success: deleted comment", async () => {
      const params = {
        userId: user.id,
        commentId: comments.id,
      };

      const result = await commentService.deleted(params);
      assert.deepEqual(result.deletedCount, 1);
    });

    it("fail: comment does not exist.", async () => {
      const params = {
        userId: user.id,
        commentId: "61b07d1cc532e5b567136b29",
      };
      try {
        await commentService.deleted(params);
      } catch (error) {
        assert.deepEqual(error, new BadRequestException("Comment does not exist."));
      };
    });
  });
});
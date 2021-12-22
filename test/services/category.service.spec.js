require("dotenv").config();

const mocha = require("mocha");
const assert = require("assert");

const { PostRepository, CategoryRepository, CommentRepository } = require("../../src/repositories");
const { CategoryService } = require("../../src/services");

const { BadRequestException } = require("../../src/common/exceptions")

const { getCategoryData } = require("../utils");

const { describe, it } = mocha;

describe("category service test", () => {
  const postRepository = new PostRepository();
  const categoryRepository = new CategoryRepository();
  const categoryService = new CategoryService(categoryRepository, postRepository);
  
  let category;
  describe("create test", () => {
    it("success: create category", async () => {
      const categoryData = getCategoryData();
      const params = {
        title: categoryData.title,
      };

      const result = await categoryService.create(params);
      category = result;
      assert.deepEqual(result.title, category.title);
    });
  });

  describe("find by category id test", () => {
    it("success: find one category by category id", async () => {
      const categoryId = category.id;
      const params = {
        categoryId
      };
      
      const result = await categoryService.findByCategoryId(params);
      assert.deepEqual(result, category);
    });
  });

  describe("find by category title test", () => {
    it("success: find category by category title", async () => {
      const { title } = category;
      const params = {
        title,
      };

      const result = await categoryRepository.findByTitle(params);
      assert.deepEqual(result, category);
    });
  });

  describe("find all test", () => {
    it("success: find all categories", async () => {
      const result = await categoryService.findAll();
      assert.deepEqual(result.length, 5);
    });
  });

  describe("updated test", () => {
    it("success: updated category", async () => {
      const categoryData = getCategoryData();
      const params = {
        categoryId: category.id,
        title: categoryData.title,
      };

      const result = await categoryService.updated(params);
      assert.deepEqual(result.id, params.categoryId);
      assert.deepEqual(result.title, params.title);
    });

    it("fail: category does not exist.", async () => {
      const categoryData = getCategoryData();
      const params = {
        categoryId: "61b07d1cc532e5b567136b29",
        title: categoryData.title,
      };
      try {
        await categoryService.updated(params);
      } catch (error) {
        assert.deepEqual(error, new BadRequestException("Category does not exist."));
      };
    });
  });

  describe("deleted test", () => {
    it("success: deleted category", async () => {
      const params = {
        categoryId: category.id,
      };

      const result = await categoryService.deleted(params);
      assert.deepEqual(result.deletedCount, 1);
    });

    it("fail: category does not exist.", async () => {
      const params = {
        categoryId: "61b07d1cc532e5b567136b29",
      };
      try {
        await categoryService.deleted(params);
      } catch (error) {
        assert.deepEqual(error, new BadRequestException("Category does not exist."));
      };
    });
  });
});
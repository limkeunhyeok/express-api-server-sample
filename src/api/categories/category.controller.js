const express = require("express");
const path = require("path");

const CategoryValidation = require("./category.validation");
const { CategoryRepository, PostRepository } = require("../../repositories");
const { CategoryService } = require("../../services");
const { wrap } = require("../../lib/wrap");

const categoryService = new CategoryService(new CategoryRepository(), new PostRepository());
const categoryValidation = new CategoryValidation();

class CategoryController {
  constructor() {
    this.path = "/categories";
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    const router = express.Router();
    
    router
      .post("/", wrap(this.create))
      .get("/", wrap(this.readAll))
      .get("/:categoryId", wrap(this.readOneAndGetAllPosts))
      .put("/:categoryId", wrap(this.updated))
      .delete("/:categoryId", wrap(this.deleted))
    
    this.router.use(this.path, router);
  }

  async create(req, res, next) {
    const { title } = req.body;
    const { user } = res.locals;
    
    categoryValidation
      .user(user)
      .title(title);

    const category = await categoryService.create({ title });
    return category;
  }

  async readAll(req, res, next) {
    const { user } = res.locals;

    categoryValidation
      .user(user);

    const categories = await categoryService.findAll();
    return categories;
  }

  async readOneAndGetAllPosts(req, res, next) {
    const { user } = res.locals;
    const categoryId = path.parse(req.params.categoryId).base;

    categoryValidation
      .user(user);
    
    const result = await categoryService.findAllPostsByCategoryID({ categoryId });
    return result;
  }

  async updated(req, res, next) {
    const { user } = res.locals;
    const { title } = req.body;
    const categoryId = path.parse(req.params.categoryId).base;

    categoryValidation
      .user(user)
      .title(title);

    const updated = await categoryService.updated({ categoryId, title });
    return { updated };
  }

  async deleted(req, res, next) {
    const { user } = res.locals;
    const categoryId = path.parse(req.params.categoryId).base;

    categoryValidation
      .user(user)

    const deleted = await categoryService.deleted({ categoryId });
    return { deleted }
  }
}

module.exports = CategoryController;
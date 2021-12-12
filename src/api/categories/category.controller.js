const express = require("express");

const CategoryValidation = require("./category.validation");
const { CategoryRepository } = require("../../repositories");
const { CategoryService } = require("../../services");
const { wrap } = require("../../lib/wrap");

const categoryService = new CategoryService(new CategoryRepository());
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
      .get("/", wrap(this.read))
      .put("/", wrap(this.updated))
      .delete("/", wrap(this.deleted))
    
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

  async read(req, res, next) {
    const { user } = res.locals;
  
    categoryValidation
      .user(user);
    
    let categories;
    const { categoryId } = req.query;
    if (categoryId) {
      categories = await categoryService.findByCategoryId({ categoryId });
    } else {
      categories = await categoryService.findAll();
    }
    return categories;
  }

  async updated(req, res, next) {
    const { categoryId } = req.query;
    const { title } = req.body;
    const { user } = res.locals;

    categoryValidation
      .user(user)
      .title(title);

    const updated = await categoryService.updated({ categoryId, title });
    return { updated };
  }

  async deleted(req, res, next) {
    const { categoryId } = req.query;
    const { user } = res.locals;

    categoryValidation
      .user(user)

    const deleted = await categoryService.deleted({ categoryId });
    return { deleted }
  }
}

module.exports = CategoryController;
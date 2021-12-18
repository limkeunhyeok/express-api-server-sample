const faker = require("faker");

const PostController = require("../src/api/posts/post.controller");
const UserController = require("../src/api/users/user.controller");
const CategoryController = require("../src/api/categories/category.controller");
const CommentController = require("../src/api/comments/comment.controller");
const App = require("../src/app");


exports.getServer = () => {
  const app = new App([
    new PostController(),
    new UserController(),
    new CategoryController(),
    new CommentController(),
  ]);
  return app.getServer();
}

exports.getUserData = () => {
  const userData = {
    email: faker.internet.email(),
    password: faker.internet.password(10, false, /^[A-Za-z0-9]*$/, "!1Aa"),
    nick: faker.lorem.word(8),
  }
  return userData;
}

exports.getPostData = () => {
  const postData = {
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(3),
  }
  return postData;
}

exports.getCategoryData = () => {
  const categoryData = {
    title: faker.lorem.word(),
  }
  return categoryData;
}

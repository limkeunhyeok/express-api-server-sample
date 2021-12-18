require("dotenv").config()

const UserController = require("./src/api/users/user.controller");
const PostController = require("./src/api/posts/post.controller");
const CategoryController = require("./src/api/categories/category.controller");
const CommentController = require("./src/api/comments/comment.controller");
const App = require("./src/app");
const connect = require("./src/lib/database");

async function startServer() {
  await connect();
  const app = new App([
    new UserController,
    new PostController,
    new CategoryController,
    new CommentController,
  ]);

  app.listen();
}

startServer();
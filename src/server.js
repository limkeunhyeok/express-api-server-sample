const UserController = require("./api/users/user.controller");
const PostController = require("./api/posts/post.controller");
const CategoryController = require("./api/categories/category.controller");
const CommentController = require("./api/comments/comment.controller");
const App = require("./app");
const connect = require("./lib/database");

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
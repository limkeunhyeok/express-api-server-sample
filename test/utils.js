const faker = require("faker");

const PostController = require("../src/api/posts/post.controller");
const UserController = require("../src/api/users/user.controller");
const App = require("../src/app");


exports.getServer = () => {
  const app = new App([
    new PostController(),
    new UserController()
  ]);
  return app.getServer();
}

exports.getUserData = () => {
  const userData = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    nick: faker.internet.userName(),
  }
  return userData;
}
require("dotenv").config()

const UserController = require("./src/api/users/user.controller");
const App = require("./src/app");
const connect = require("./src/lib/database");

async function startServer() {
  await connect();
  const app = new App([
    new UserController
  ]);

  app.listen();
}

startServer();
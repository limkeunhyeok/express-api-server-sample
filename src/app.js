const express = require("express");
const session = require("express-session");

const { authMiddleware, errorMiddleware, loggingMiddleware, notFoundMiddleware } = require("./middlewares");
const logger = require("./lib/logger");
const { swaggerUi, specs } = require("./lib/swagger");
const { port } = require("./config");

class App {
  constructor(controllers) {
    this.app = express();
    
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  getServer() {
    return this.app;
  }

  listen() {
    this.app.listen(port, () => {
      logger.info(`Example app listening on port ${port}!`);
    })
  }

  initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(
      session({
        name: "api-sample",
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true,
      })
    );
    this.app.use(loggingMiddleware);
    this.app.use(authMiddleware);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  initializeErrorHandling() {
    this.app.use(notFoundMiddleware);
    this.app.use(errorMiddleware);
  }

  initializeControllers(controllers) {
    const router = express.Router();

    router.get("/", (req, res) => res.send("ok"));

    controllers.forEach((controller) => {
      router.use(controller.router)
    });

    this.app.use("/api", router);
  }
}

module.exports = App;
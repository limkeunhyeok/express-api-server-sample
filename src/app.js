const express = require("express");
const session = require("express-session");
const morgan = require("morgan");

const { authMiddleware, errorMiddleware } = require("./middlewares")
const logger = require("./lib/winston");

const morganFormat = process.env.NODE_ENV !== "production" ? "dev" : "combined";


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
    const port = process.env.PORT || 4000;
    this.app.listen(port, () => {
      logger.info(`Example app listening on port ${port}!`);
    })
  }

  initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(
      session({
        name: "api-sample",
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: true,
      })
    );
    // this.app.use(morgan(morganFormat, {stream: logger.stream}));
    this.app.use(authMiddleware);
  }

  initializeErrorHandling() {
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
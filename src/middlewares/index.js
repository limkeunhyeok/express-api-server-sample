const authMiddleware = require("./auth.middleware");
const errorMiddleware = require("./error.middleware");
const loggingMiddleware = require("./logging.middleware");
const notFoundMiddleware = require("./not-found.middleware");

module.exports = {
  authMiddleware,
  errorMiddleware,
  loggingMiddleware,
  notFoundMiddleware,
};

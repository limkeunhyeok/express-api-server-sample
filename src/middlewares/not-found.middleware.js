const logger = require("../lib/logger");
const { NotFoundException } = require("../common/exceptions")

function notFoundMiddleware(req, res, next) {
  const error = new NotFoundException("The requested url was not found on this server.");
  const { status, message } = error;
  logger.error(`${message} ${status}`);
  res.status(status).json({ status, message });
  next();
}

module.exports = notFoundMiddleware;
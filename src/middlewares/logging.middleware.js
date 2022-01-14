const morgan = require("morgan");
const logger = require("../lib/logger");
const { nodeEnv } = require("../config");

const format = () => {
  const result = nodeEnv === "production" ? "combined" : "common";
  return result;
}

const stream = { write: (message) => logger.http(message) };
const skip = (_, res) => {
  if (nodeEnv === "production") {
    return res.statusCode < 400;
  }
  return false;
}

const logginMiddleware = morgan(format(), { stream, skip });

module.exports = logginMiddleware;

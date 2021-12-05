const morgan = require("morgan");
const logger = require("../lib/winston");
const morganFormat = process.env.NODE_ENV !== "production" ? "dev" : "combined";

function accessMiddleware(req, res, next) {
  console.log("?????", morganFormat)
  morgan(morganFormat, { stream: logger.stream});
  next();
}

module.exports = accessMiddleware;
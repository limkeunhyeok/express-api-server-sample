const Response = require("../lib/response");

function errorMiddleware(err, req, res, next) {
  const status = err.status || 500;
  const {message} = err;

  const response = new Response(false).error({
    status,
    message
  }).toJson();
  res.status(status).json(response);

  next();
}

module.exports = errorMiddleware;
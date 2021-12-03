function errorMiddleware(err, req, res, next) {
  const status = err.status || 500;
  const {message} = err;

  res.status(status).json({
    status,
    message,
  });

  next();
}

module.exports = errorMiddleware;
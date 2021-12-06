const Response = require("./response");

exports.wrap = (handler) => async (req, res, next) => {
  try {
    const result = await handler(req, res, next);
    const response = new Response(true).data(result).toJson();
    res.json(response);
    next();
  } catch (error) {
    next(error)
  }
}
const UnauthorizedException = require("../common/exceptions/unauthorized.exception");
const { verify } = require("../lib/jwt");

function authMiddleWare(req, res, next) {
  const bearerToken = req.headers.authorization;
  if (bearerToken) {
    try {
      const token = bearerToken.replace(/^Bearer /, '');
      const decoded = verify(token);
      res.locals.user = decoded;
      next();
    } catch (err) {
      next(new UnauthorizedException());
    }
  } else {
    next();
  }
}

module.exports = authMiddleWare;
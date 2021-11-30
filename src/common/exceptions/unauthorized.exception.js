const HttpException = require("./http.exception");

class UnauthorizedException extends HttpException {
  constructor(message = "Unauthorized") {
    super(401, message);
  }
}

module.exports = UnauthorizedException;
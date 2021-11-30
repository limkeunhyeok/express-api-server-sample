const HttpException = require("./http.exception");

class ForbiddenException extends HttpException {
  constructor(message = "Forbidden") {
    super(403, message);
  }
}

module.exports = ForbiddenException;
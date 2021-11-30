const HttpException = require("./http.exception");

class NotFoundException extends HttpException {
  constructor(message = "Not found") {
    super(404, message);
  }
}

module.exports = NotFoundException;
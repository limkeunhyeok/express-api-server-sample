const BadRequestException = require("./bad-request.exception");
const ForbiddenException = require("./forbidden.exception");
const NotFoundException = require("./not-found.exception");
const UnauthorizedException = require("./unauthorized.exception");

module.exports = {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
}
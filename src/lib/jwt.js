const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "keyboard cat";

function create(payload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "7d",
  });
}

function verify(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = {
  create,
  verify,
}
require("dotenv").config();

const port = process.env.PORT || 4000;
const dbURL = process.env.DB_URL;
const jwtSecret = process.env.JWT_SECRET || "keyboard cat";
const nodeEnv = process.env.NODE_ENV || "development";

module.exports = {
  port,
  dbURL,
  jwtSecret,
  nodeEnv,
}
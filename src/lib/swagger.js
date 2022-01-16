const swaggerUi = require("swagger-ui-express");
const swaggereJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Express Service with Swagger",
      version: "1.0.0",
      description: "a Rest api using swagger and express.",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: [
    "./src/models/*.js",
    "./src/api/comments/*.js",
    "./src/api/posts/*.js",
    "./src/api/users/*.js",
    './src/swagger/*'
  ]
};

const specs = swaggereJsdoc(options);

module.exports = {
  swaggerUi,
  specs
};
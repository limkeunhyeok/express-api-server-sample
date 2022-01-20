const swaggerUi = require("swagger-ui-express");
const swaggereJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Express API Server Sample",
      version: "1.0.0",
      description: "This is a express api server sample. This document provides api and schema information. This project is intended to demonstrate development skills. In actual development, it has a similar structure and style to this project, and the documentation is similar.",
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Main (production) server"
      },
      {
        url: "http://127.0.0.1:4000",
        description: "Internal starting server for testing"
      },
    ],
  },
  apis: [
    './src/swagger/api/*',
    './src/swagger/schema/*'
  ]
};

const specs = swaggereJsdoc(options);

module.exports = {
  swaggerUi,
  specs
};
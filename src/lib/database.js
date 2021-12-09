const mongoose = require("mongoose");
const UserModel = require("../models/user.model");
const CategoryModel = require("../models/category.model");
const { userData } = require("../data/user.data");
const { categoryData } = require("../data/category.data");

function connect() {
  mongoose.connect(process.env.DB_URL, {
    dbName: "Express-API",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection
    .on("error", console.log)
    .on('disconnected', connect);
  
  mongoose.connection
    .dropCollection("users", (err) => {
      UserModel.create(userData);
    });

  mongoose.connection
    .dropCollection("categories", (err) => {
      CategoryModel.create(categoryData);
    });
}

module.exports = connect
const mongoose = require("mongoose");
const { UserModel, CategoryModel } = require("../models");
const { userData, categoryData } = require("../data");

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
      userData.forEach((data) => {
        const user = UserModel(data);
        user.save();
      });
    });

  mongoose.connection
    .dropCollection("categories", (err) => {
      categoryData.forEach((data) => {
        const category = new CategoryModel(data);
        category.save();
      });
    });
}

module.exports = connect
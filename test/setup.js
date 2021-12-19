require("dotenv").config();

const mongoose = require("mongoose");
const mocha = require("mocha");

const { UserModel, PostModel, CategoryModel, CommentModel } = require("../src/models");
const { userData, categoryData } = require("../src/data")

const { before, after } = mocha;

before(async () => {
  await mongoose.connect(process.env.DB_URL, {
    dbName: "Express-API",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection
    .on("error", console.log);
  
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
});

after(async () => {
  await UserModel.deleteMany({});
  await PostModel.deleteMany({});
  await CategoryModel.deleteMany({});
  await CommentModel.deleteMany({});
  await mongoose.disconnect();
});
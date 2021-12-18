require("dotenv").config();

const mongoose = require("mongoose");
const mocha = require("mocha");

const { UserModel, PostModel, CategoryModel, CommentModel } = require("../src/models")

const { before, after } = mocha;

before(async () => {
  await mongoose.connect(process.env.DB_URL, {
    dbName: "Express-API",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection
    .on("error", console.log);
});

after(async () => {
  await UserModel.deleteMany({});
  await PostModel.deleteMany({});
  await CategoryModel.deleteMany({});
  await CommentModel.deleteMany({});
  await mongoose.disconnect();
});
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  nick: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
}, {
  versionKey: false,
});

userSchema.pre("save", async function encryptionPassword(next) {
  const user = this
  user.password = await bcrypt.hash(user.password, 10);
  next();
})

module.exports = mongoose.model("User", userSchema);
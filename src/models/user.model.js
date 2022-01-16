const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - email
 *          - password
 *          - nick
 *        properties:
 *          email:
 *            type: string
 *            format: email
 *            description: Email for the user, needs to be unique.
 *          password:
 *            type: string
 *          nick:
 *            type: string
 *          createdAt:
 *            type: date
 *          updatedAt:
 *            type: date
 *        example:
 *           email: example@email.com
 *           password: $2b$10$Q6XVnrIzh8vYUxwgvBubY.XhxWokGdI0P0vCXEb7d2d7UxmCVmkIu
 *           nick: example
 *           createdAt: 2022-01-15T19:43:53.211+00:00
 *           updatedAt: 2022-01-15T19:43:53.211+00:00
 */

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
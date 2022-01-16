const mongoose = require("mongoose");

const { Schema } = mongoose;

/**
 * @swagger
 *  components:
 *    schemas:
 *      Comment:
 *        type: object
 *        required:
 *          - userId
 *          - postId
 *          - content
 *        properties:
 *          userId:
 *            type: objectId
 *          postId:
 *            type: objectId
 *          content:
 *            type: string
 *          createdAt:
 *            type: date
 *        example:
 *           userId: 61e418db9838668324830cca
 *           postId: 61e418db9838668324830ccc
 *           content: Occaecati minus voluptate.
 *           createdAt: 2022-01-16T13:08:43.111+00:00
 */

const commentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model("Comment", commentSchema);
const mongoose = require("mongoose");

const { Schema } = mongoose;

/**
 * @swagger
 *  components:
 *    schemas:
 *      Post:
 *        type: object
 *        required:
 *          - userId
 *          - categoryId
 *          - title
 *          - slug
 *          - content
 *        properties:
 *          userId:
 *            type: objectId
 *          categoryId:
 *            type: objectId
 *          title:
 *            type: string
 *          slug:
 *            type: string
 *          content:
 *            type: string
 *          createdAt:
 *            type: date
 *          updatedAt:
 *            type: date
 *        example:
 *           userId: 61e418db9838668324830cca
 *           categoryId: 61e418db9838668324830ccc
 *           title: Dolorem sequi voluptas non.
 *           slug: Dolorem-sequi-voluptas-non.-u2Hx7_Sja
 *           content: Occaecati minus voluptate. Minima similique deleniti optio deleniti ipsum cumque. Tempore et in quae a. Libero ut et accusamus sint. Modi est nihil. Dolor harum velit illum iusto. Consectetur omnis ipsa repellendus explicabo aut repellat. Excepturi optio magnam nam ducimus fuga labore voluptatibus. Modi enim quas in id quaerat mollitia et. Aspernatur et iste harum. Qui magnam voluptatibus quod maiores doloremque aperiam esse voluptates id. Quisquam iusto corrupti sint aut nihil.
 *           createdAt: 2022-01-16T13:08:43.111+00:00
 *           updatedAt: 2022-01-16T13:08:43.111+00:00
 */

const postSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
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
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model("Post", postSchema);
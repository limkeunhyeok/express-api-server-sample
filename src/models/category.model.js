const mongoose = require("mongoose");

const { Schema } = mongoose;

/**
 * @swagger
 *  components:
 *    schemas:
 *      Category:
 *        type: object
 *        required:
 *          - title
 *        properties:
 *          title:
 *            type: string
 *          createdAt:
 *            type: date
 *        example:
 *           title: minus
 *           createdAt: 2022-01-16T13:08:43.111+00:00
 */

const categorySchema = new Schema({
  title: {
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

module.exports = mongoose.model("Category", categorySchema);
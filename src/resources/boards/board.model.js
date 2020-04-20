const uuid = require('uuid');
const { Schema, model } = require('mongoose');

const boardSchema = new Schema(
  {
    title: String,
    columns: Array,
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

boardSchema.statics.toResponse = board => {
  const { id, title, columns } = board;
  return { id, title, columns };
};

const Board = model('Board', boardSchema);

module.exports = Board;

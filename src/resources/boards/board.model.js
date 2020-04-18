const uuid = require('uuid');
const { Schema, model } = require('mongoose');
// class Board {
//   constructor(title, columns) {
//     this.id = uuid();
//     this.title = title || 'title';
//     this.columns = columns || [];
//   }
// }

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

const uuid = require('uuid');

const { Schema, model } = require('mongoose');

// class Task {
//   constructor(title, order, description, userId, boardId, columnId) {
//     this.id = uuid();
//     this.title = title;
//     this.order = order;
//     this.description = description;
//     this.userId = userId;
//     this.boardId = boardId;
//     this.columnId = columnId;
//   }
// }

const taskSchema = new Schema(
  {
    title: String,
    order: Number,
    password: String,
    description: String,
    userId: String,
    boardId: String,
    columnId: String,
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

taskSchema.statics.toResponse = task => {
  const { id, title, order, description, userId } = task;
  return { id, title, order, description, userId };
};

const Task = model('Task', taskSchema);

module.exports = Task;

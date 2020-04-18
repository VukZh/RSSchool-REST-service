const Board = require('./board.model');
const Task = require('../tasks/task.model');

// const boards = [];

const saveBoard = async (title, columns) => {
  //   const newBoard = new Board(title, columns);
  //   boards.push(newBoard);
  //   return newBoard;
  //   return new Error();
  return Board.create({
    title,
    columns
  });
};

const getAll = async () => {
  // boards;
  return Board.find({});
  //   return new Error();
};

const getBoardId = async boardId => {
  //   boards.find(board => board.id === boardId);
  //   return new Error();
  return Board.findById(boardId);
};

const changeBoard = async (boardId, title, columns) => {
  //   const chBoard = await getBoardId(boardId);
  //   if (chBoard) {
  //     Object.assign(chBoard, { title, columns });
  //     return chBoard;
  //   }
  //   return false;
  return Board.updateOne({ _id: boardId }, { boardId, title, columns });
  //   return new Error();
};

const delBoard = async _boardId => {
  //   const ind = boards.findIndex(item => item.id === boardId);
  //   if (ind !== -1) {
  //     boards.splice(ind, 1);
  //     return true;
  //   }
  //   return false;
  //   return new Error();
  Task.deleteMany({ boardId: _boardId }).exec();
  return Board.deleteOne({ _id: _boardId });
};

module.exports = { getAll, getBoardId, saveBoard, changeBoard, delBoard };

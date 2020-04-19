const Board = require('./board.model');

const saveBoard = async (title, columns) => {
  return Board.create({
    title,
    columns
  });
};

const getAll = async () => {
  return Board.find({});
};

const getBoardId = async boardId => {
  return Board.findById(boardId);
};

const changeBoard = async (boardId, title, columns) => {
  return Board.updateOne({ _id: boardId }, { boardId, title, columns });
};

const delBoard = async _boardId => {
  return Board.deleteOne({ _id: _boardId });
};

module.exports = { getAll, getBoardId, saveBoard, changeBoard, delBoard };

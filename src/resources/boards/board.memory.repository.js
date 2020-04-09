const Board = require('./board.model');

const boards = [];

const saveBoard = async (title, columns) => {
  const newBoard = new Board(title, columns);
  boards.push(newBoard);
  return newBoard;
};

const getAll = async () => boards;

const getBoardId = async boardId => boards.find(board => board.id === boardId);

const changeBoard = async (boardId, title, columns) => {
  const chBoard = await getBoardId(boardId);
  if (chBoard) {
    Object.assign(chBoard, { title, columns });
    return chBoard;
  }
  return false;
};

const delBoard = async boardId => {
  const ind = boards.findIndex(item => item.id === boardId);
  if (ind !== -1) {
    boards.splice(ind, 1);
    return true;
  }
  return false;
};

module.exports = { getAll, getBoardId, saveBoard, changeBoard, delBoard };

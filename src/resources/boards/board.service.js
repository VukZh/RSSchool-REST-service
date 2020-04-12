const boardsRepo = require('./board.memory.repository');

const getAll = () => boardsRepo.getAll();

const getBoardId = boardId => boardsRepo.getBoardId(boardId);

const saveBoard = (title, columns) => boardsRepo.saveBoard(title, columns);

const changeBoard = (boardId, title, columns) =>
  boardsRepo.changeBoard(boardId, title, columns);

const delBoard = boardId => boardsRepo.delBoard(boardId);

module.exports = { getAll, getBoardId, saveBoard, changeBoard, delBoard };

const router = require('express').Router();
const Board = require('./board.model');

router
  .route('/')
  .get(async (req, res) => {
    const boards = await Board.getAll();
    res.json(boards);
  })
  .post(async (req, res) => {
    const board = new Board(req.body.title, req.body.columns);
    await board.saveBoard();
    res.json({ id: board.id, title: board.title, columns: board.columns });
  });

router
  .route('/:boardId')
  .get(async (req, res) => {
    const board = await Board.getBoardId(req.params.boardId);
    res.json(board);
  })
  .put(async (req, res) => {
    await Board.changeBoard(
      req.params.boardId,
      req.body.title,
      req.body.columns
    );
    const board = await Board.getBoardId(req.params.boardId);
    res.json(board);
  })
  .delete(async (req, res) => {
    await Board.delBoard(req.params.boardId);
    res.send('delete');
  });

module.exports = router;

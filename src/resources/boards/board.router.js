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
    if (!board) {
      res.status(404).json('Board not found');
    } else {
      res.json(board);
    }
  })
  .put(async (req, res) => {
    await Board.changeBoard(
      req.params.boardId,
      req.body.title,
      req.body.columns
    );
    const board = await Board.getBoardId(req.params.boardId);
    if (!board) {
      res.status(400).json('Bad request');
    } else {
      res.json(board);
    }
  })
  .delete(async (req, res) => {
    const board = await Board.getBoardId(req.params.boardId);
    if (!board) {
      res.status(404).json('Board not found');
    } else {
      await Board.delBoard(req.params.boardId);
      res.status(204).send('The user has been deleted');
    }
  });

module.exports = router;

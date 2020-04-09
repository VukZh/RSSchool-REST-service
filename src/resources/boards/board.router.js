const router = require('express').Router();

const boardsService = require('./board.service');
const tasksService = require('../tasks/task.service');

router
  .route('/')
  .get(async (req, res) => {
    const boards = await boardsService.getAll();
    res.status(200).json(boards);
  })
  .post(async (req, res) => {
    const resBoard = await boardsService.saveBoard(
      req.body.title,
      req.body.columns
    );
    res.status(200).json(resBoard);
  });

router
  .route('/:boardId')
  .get(async (req, res) => {
    const resBoard = await boardsService.getBoardId(req.params.boardId);
    if (resBoard) {
      res.status(200).json(resBoard);
    } else {
      res.status(404).json('Board not found');
    }
  })
  .put(async (req, res) => {
    const resBoard = await boardsService.changeBoard(
      req.params.boardId,
      req.body.title,
      req.body.columns
    );
    if (resBoard) {
      res.status(200).json(resBoard);
    } else {
      res.status(401).json('Access token is missing or invalid');
    }
  })
  .delete(async (req, res) => {
    const delBoard = await boardsService.delBoard(req.params.boardId);
    if (delBoard) {
      await tasksService.delTaskInBoard(req.params.boardId);
      res.status(204).json('The board has been deleted');
    } else {
      res.status(404).json('Board not found');
    }
  });

module.exports = router;

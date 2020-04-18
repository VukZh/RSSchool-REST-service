const router = require('express').Router();
const Board = require('./board.model');

const boardsService = require('./board.service');
const tasksService = require('../tasks/task.service');

const { validationResult, param } = require('express-validator');

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const boards = await boardsService.getAll();
      const resBoard = boards.map(Board.toResponse);
      res.status(200).json(resBoard);
    } catch (error) {
      // console.log('ERRooRRR ' + resBoard);
      return next(error);
    }
  })
  .post(async (req, res) => {
    const resBoard = await boardsService.saveBoard(
      req.body.title,
      req.body.columns
    );
    res.status(200).json(Board.toResponse(resBoard));
  });

router
  .route('/:boardId')
  .get([param('boardId').isUUID()], async (req, res, next) => {
    try {
      const errorReq = validationResult(req);
      if (!errorReq.isEmpty()) {
        throw new TypeError(
          `wrong get board ${JSON.stringify(errorReq.array())}`
        );
      }
      const resBoard = await boardsService.getBoardId(req.params.boardId);
      // console.log('-------resBoard-------- ' + resBoard)
      if (resBoard) {
        res.status(200).json(Board.toResponse(resBoard));
      } else {
        res.status(404).json('Board not found');
      }
    } catch (error) {
      return next(error);
    }
  })
  .put([param('boardId').isUUID()], async (req, res, next) => {
    try {
      const errorReq = validationResult(req);
      if (!errorReq.isEmpty()) {
        throw new TypeError(
          `wrong edit board ${JSON.stringify(errorReq.array())}`
        );
      }
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
    } catch (error) {
      return next(error);
    }
  })
  .delete([param('boardId').isUUID()], async (req, res, next) => {
    try {
      const errorReq = validationResult(req);
      if (!errorReq.isEmpty()) {
        throw new TypeError(
          `wrong delete board ${JSON.stringify(errorReq.array())}`
        );
      }
      const delBoard = await boardsService.delBoard(req.params.boardId);
      if (delBoard) {
        await tasksService.delTaskInBoard(req.params.boardId);
        res.status(204).json('The board has been deleted');
      } else {
        res.status(404).json('Board not found');
      }
    } catch (error) {
      return next(error);
    }
  });

module.exports = router;

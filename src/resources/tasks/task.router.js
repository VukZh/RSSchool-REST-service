const router = require('express').Router();
const tasksService = require('./task.service');
const { validationResult, param } = require('express-validator');
const Task = require('./task.model');

router
  .route('/:boardId/tasks')
  .get([param('boardId').isUUID()], async (req, res, next) => {
    try {
      const errorReq = validationResult(req);
      if (!errorReq.isEmpty()) {
        throw new TypeError(
          `wrong get tasks ${JSON.stringify(errorReq.array())}`
        );
      }
      const tasks = await tasksService.getAll(req.params.boardId);

      const resTasks = tasks.map(Task.toResponse);

      res.status(200).json(resTasks);
    } catch (error) {
      return next(error);
    }
  })
  .post(async (req, res) => {
    const resTask = await tasksService.saveTask(
      req.body.title,
      req.body.order,
      req.body.description,
      req.body.userId,
      req.params.boardId,
      req.body.columnId
    );
    res.status(200).json(resTask);
  });

router
  .route('/:boardId/tasks/:taskId')
  .get(
    [param('taskId').isUUID(), param('boardId').isUUID()],
    async (req, res, next) => {
      try {
        const errorReq = validationResult(req);
        if (!errorReq.isEmpty()) {
          throw new TypeError(
            `wrong get task ${JSON.stringify(errorReq.array())}`
          );
        }
        const resTask = await tasksService.getTaskId(
          req.params.taskId,
          req.params.boardId
        );
        if (resTask) {
          res.status(200).json(Task.toResponse(resTask));
        } else {
          res.status(404).json('Task not found');
        }
      } catch (error) {
        return next(error);
      }
    }
  )
  .put(
    [param('taskId').isUUID(), param('boardId').isUUID()],
    async (req, res, next) => {
      try {
        const errorReq = validationResult(req);
        if (!errorReq.isEmpty()) {
          throw new TypeError(
            `wrong edit task ${JSON.stringify(errorReq.array())}`
          );
        }
        const resTask = await tasksService.changeTask(
          req.params.taskId,
          req.params.boardId,
          req.body.id,
          req.body.title,
          req.body.order,
          req.body.description,
          req.body.userId,
          req.body.boardId,
          req.body.columnId
        );
        if (resTask) {
          res.status(200).json(resTask);
        } else {
          res.status(401).json('Access token is missing or invalid');
        }
      } catch (error) {
        return next(error);
      }
    }
  )
  .delete(
    [param('taskId').isUUID(), param('boardId').isUUID()],
    async (req, res, next) => {
      try {
        const errorReq = validationResult(req);
        if (!errorReq.isEmpty()) {
          throw new TypeError(
            `wrong delete task ${JSON.stringify(errorReq.array())}`
          );
        }
        const delTask = await tasksService.delTask(
          req.params.taskId,
          req.params.boardId
        );
        if (delTask) {
          res.status(204).json('The task has been deleted');
        } else {
          res.status(404).json('Task not found');
        }
      } catch (error) {
        return next(error);
      }
    }
  );

module.exports = router;

const router = require('express').Router();

const tasksService = require('./task.service');

router
  .route('/:boardId/tasks')
  .get(async (req, res) => {
    const tasks = await tasksService.getAll(req.params.boardId);
    res.status(200).json(tasks);
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
  .get(async (req, res) => {
    const resTask = await tasksService.getTaskId(
      req.params.taskId,
      req.params.boardId
    );
    if (resTask) {
      res.status(200).json(resTask);
    } else {
      res.status(404).json('Task not found');
    }
  })
  .put(async (req, res) => {
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
  })
  .delete(async (req, res) => {
    const delTask = await tasksService.delTask(
      req.params.taskId,
      req.params.boardId
    );
    if (delTask) {
      res.status(204).json('The task has been deleted');
    } else {
      res.status(404).json('Task not found');
    }
  });

module.exports = router;

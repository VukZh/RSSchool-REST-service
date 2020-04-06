const router = require('express').Router();
const Task = require('./task.model');

router
  .route('/:boardId/tasks')
  .get(async (req, res) => {
    const tasks = await Task.getAll_Board(req.params.boardId);
    // console.log('boardId ' + req.params.boardId);
    const result = tasks.map(item => ({
      id: item.id,
      title: item.title,
      order: item.order,
      description: item.description,
      userId: item.userId
    }));
    res.json(result);
  })
  .post(async (req, res) => {
    const tasks = new Task(
      req.body.title,
      req.body.order,
      req.body.description,
      req.body.userId,
      req.params.boardId,
      req.body.columnId
    );
    console.log(
      `task add ${req.body.title} ${req.body.order} ${req.body.description} ${req.body.userId} ${req.params.boardId} ${req.body.columnId}`
    );
    await tasks.saveTask();
    res.json({
      id: tasks.id,
      title: tasks.title,
      order: tasks.order,
      description: tasks.description,
      userId: tasks.userId
    });
  });

router
  .route('/:boardId/tasks/:taskId')
  .get(async (req, res) => {
    const task = await Task.getTaskId(req.params.boardId, req.params.taskId);
    console.log(`task ${task}`);
    res.json({
      id: task.id,
      title: task.title,
      order: task.order,
      description: task.description,
      userId: task.userId
    });
  })
  .put(async (req, res) => {
    await Task.changeTask(
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
    const task = await Task.getTaskId(req.body.boardId, req.body.id);
    console.log(`task ${task}`);
    res.json({
      id: task.id,
      title: task.title,
      order: task.order,
      description: task.description,
      userId: task.userId
    });
  })
  .delete(async (req, res) => {
    await Task.delTask(req.params.taskId, req.params.boardId);
    res.send('delete');
  });

module.exports = router;

/* eslint-disable max-params */
const tasksRepo = require('./task.memory.repository');
const getAll = boardId => tasksRepo.getAll(boardId);

const getTaskId = (taskId, boardId) => tasksRepo.getTaskId(taskId, boardId);

const saveTask = (title, order, description, userId, boardId, columnId) =>
  tasksRepo.saveTask(title, order, description, userId, boardId, columnId);

const changeTask = (
  taskIdOld,
  boardIdOld,
  id,
  title,
  order,
  description,
  userId,
  boardId,
  columnId
) =>
  tasksRepo.changeTask(
    taskIdOld,
    boardIdOld,
    id,
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  );

const delTask = (taskId, boardId) => {
  return tasksRepo.delTask(taskId, boardId);
};

const delTaskInBoard = boardId => {
  return tasksRepo.delTaskInBoard(boardId);
};

const nulTaskForUser = taskId => {
  return tasksRepo.nulTaskForUser(taskId);
};

module.exports = {
  getAll,
  getTaskId,
  saveTask,
  changeTask,
  delTask,
  delTaskInBoard,
  nulTaskForUser
};

/* eslint-disable max-params */
const Task = require('./task.model');

const tasks = [];

const saveTask = async (
  title,
  order,
  description,
  userId,
  boardId,
  columnId
) => {
  const newTask = new Task(
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  );
  tasks.push(newTask);
  return newTask;
};

const getAll = async boardId => tasks.filter(task => task.boardId === boardId);

const getTaskId = async (taskId, boardId) =>
  tasks.find(task => task.id === taskId && task.boardId === boardId);

const changeTask = async (
  taskIdOld,
  boardIdOld,
  id,
  title,
  order,
  description,
  userId,
  boardId,
  columnId
) => {
  const chTask = await getTaskId(taskIdOld, boardIdOld);
  if (chTask) {
    Object.assign(chTask, {
      id,
      title,
      order,
      description,
      userId,
      boardId,
      columnId
    });
    return chTask;
  }
  return false;
};

const delTask = async (taskId, boardId) => {
  const ind = tasks.findIndex(
    task => task.id === taskId && task.boardId === boardId
  );
  if (ind !== -1) {
    tasks.splice(ind, 1);
    return true;
  }
  return false;
};

const delTaskInBoard = async boardId => {
  const ind = [];
  tasks.forEach((el, index) => {
    if (el.boardId === boardId) ind.push(index);
  });
  ind.reverse();
  ind.forEach(index => tasks.splice(index, 1));
};

const nulTaskForUser = async userId => {
  const ind = [];
  tasks.forEach((el, index) => {
    if (el.userId === userId) ind.push(index);
  });
  ind.forEach(index => (tasks[index].userId = null));
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

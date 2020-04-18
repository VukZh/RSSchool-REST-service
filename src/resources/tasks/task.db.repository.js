/* eslint-disable max-params */
const Task = require('./task.model');

// const tasks = [];

const saveTask = async (
  title,
  order,
  description,
  userId,
  boardId,
  columnId
) => {
  //   const newTask = new Task(
  //     title,
  //     order,
  //     description,
  //     userId,
  //     boardId,
  //     columnId
  //   );
  //   tasks.push(newTask);
  //   return newTask;
  //   return new Error();
  return Task.create({
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  });
};

const getAll = async _boardId => {
  // tasks.filter(task => task.boardId === boardId);
  return Task.find({ boardId: _boardId });
};

const getTaskId = async (_taskId, _boardId) => {
  // tasks.find(task => task.id === taskId && task.boardId === boardId);
  return Task.find({ _id: _taskId, boardId: _boardId });
};

const changeTask = async (
  _taskIdOld,
  _boardIdOld,
  id,
  title,
  order,
  description,
  userId,
  boardId,
  columnId
) => {
  return Task.updateOne(
    { _id: _taskIdOld, boardId: _boardIdOld },
    { id, title, order, description, userId, boardId, columnId }
  );
  //   const chTask = await getTaskId(taskIdOld, boardIdOld);
  //   if (chTask) {
  //     Object.assign(chTask, {
  //       id,
  //       title,
  //       order,
  //       description,
  //       userId,
  //       boardId,
  //       columnId
  //     });
  //     return chTask;
  //   }
  //   return false;
  //   return new Error();
};

const delTask = async (_taskId, _boardId) => {
  //   const ind = tasks.findIndex(
  //     task => task.id === taskId && task.boardId === boardId
  //   );
  //   if (ind !== -1) {
  //     tasks.splice(ind, 1);
  //     return true;
  //   }
  //   return false;
  return Task.deleteOne({ _id: _taskId, boardId: _boardId });
};

const delTaskInBoard = async _boardId => {
  //   const ind = [];
  //   tasks.forEach((el, index) => {
  //     if (el.boardId === boardId) ind.push(index);
  //   });
  //   ind.reverse();
  //   ind.forEach(index => tasks.splice(index, 1));
  //   return new Error();
  return Task.deleteMany({ boardId: _boardId });
};

const nulTaskForUser = async userId => {
  //   const ind = [];
  //   tasks.forEach((el, index) => {
  //     if (el.userId === userId) ind.push(index);
  //   });
  //   ind.forEach(index => (tasks[index].userId = null));
  console.log(userId);
  return new Error();
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

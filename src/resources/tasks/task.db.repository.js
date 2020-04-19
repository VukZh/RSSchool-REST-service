/* eslint-disable max-params */
const Task = require('./task.model');

const saveTask = async (
  title,
  order,
  description,
  userId,
  boardId,
  columnId
) => {
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
  return Task.find({ boardId: _boardId });
};

const getTaskId = async (_taskId, _boardId) => {
  return Task.findOne({ _id: _taskId, boardId: _boardId });
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
};

const delTask = async (_taskId, _boardId) => {
  return (await Task.deleteOne({ _id: _taskId, boardId: _boardId }))
    .deletedCount;
};

const delTaskInBoard = async _boardId => {
  return Task.deleteMany({ boardId: _boardId });
};

const nulTaskForUser = async _userId => {
  return Task.updateMany({ userId: _userId }, { $set: { userId: null } });
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

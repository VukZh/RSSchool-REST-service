const uuid = require('uuid');
const fs = require('fs');
const path = require('path');
const fakerBoards = require('faker');

class Task {
  constructor(title, order, description, userId, boardId, columnId) {
    this.id = uuid();
    this.title = title || fakerBoards.name.title();
    this.order = order || fakerBoards.random.number();
    this.description = description || fakerBoards.random.words();
    this.userId = userId || uuid();
    this.boardId = boardId || uuid();
    this.columnId = columnId || uuid();
  }

  taskToJSON() {
    return JSON.stringify({
      id: this.id,
      title: this.title,
      order: this.order,
      description: this.description,
      userId: this.userId,
      boardId: this.boardId,
      columnId: this.columnId
    });
  }

  async saveTask() {
    const tasks = await Task.getAllTask();
    tasks.push(this.taskToJSON());
    return new Promise((res, rej) => {
      fs.writeFile(
        path.join(__dirname, '../..', 'data', 'tasks.json'),
        JSON.stringify(tasks),
        err => {
          if (err) {
            rej(err);
          } else {
            res();
          }
        }
      );
    });
  }

  static getAllTask() {
    return new Promise((res, rej) => {
      fs.readFile(
        path.join(__dirname, '../..', 'data', 'tasks.json'),
        'utf-8',
        (err, content) => {
          if (err) {
            rej(err);
          } else {
            res(JSON.parse(content));
          }
        }
      );
    });
  }

  static getAll_Board(paramsBoardId) {
    return new Promise((res, rej) => {
      fs.readFile(
        path.join(__dirname, '../..', 'data', 'tasks.json'),
        'utf-8',
        (err, content) => {
          if (err) {
            rej(err);
          } else {
            const resNewStr = JSON.parse(content);
            const resNewObj = resNewStr.map(item => JSON.parse(item));
            res(
              resNewObj
                .map(item => ({
                  id: item.id,
                  title: item.title,
                  order: item.order,
                  description: item.description,
                  userId: item.userId,
                  boardId: item.boardId,
                  columnId: item.columnId
                }))
                .filter(item => item.boardId === paramsBoardId)
            );
          }
        }
      );
    });
  }

  static getAll() {
    return new Promise((res, rej) => {
      fs.readFile(
        path.join(__dirname, '../..', 'data', 'tasks.json'),
        'utf-8',
        (err, content) => {
          if (err) {
            rej(err);
          } else {
            const resNewStr = JSON.parse(content);
            const resNewObj = resNewStr.map(item => JSON.parse(item));
            res(
              resNewObj.map(item => ({
                id: item.id,
                title: item.title,
                order: item.order,
                description: item.description,
                userId: item.userId,
                boardId: item.boardId,
                columnId: item.columnId
              }))
            );
          }
        }
      );
    });
  }

  static async getTaskId(boardId, taskId) {
    const tasks = await Task.getAll_Board(boardId);
    return tasks.find(item => item.id === taskId && item.boardId === boardId);
  }

  // eslint-disable-next-line max-params
  static async changeTask(
    taskIdOld,
    boardIdOld,
    id,
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  ) {
    const tmp = await Task.getAll();

    const ind = tmp.findIndex(
      item => item.id === taskIdOld && item.boardId === boardIdOld
    );
    if (ind === -1) return;
    const tasks = await Task.getAllTask();
    tasks[ind] = JSON.stringify({
      id,
      title,
      order,
      description,
      userId,
      boardId,
      columnId
    });
    return new Promise((res, rej) => {
      fs.writeFile(
        path.join(__dirname, '../..', 'data', 'tasks.json'),
        JSON.stringify(tasks),
        err => {
          if (err) {
            rej(err);
          } else {
            res();
          }
        }
      );
    });
  }

  static async delTask(taskId, boardId) {
    const tmp = await Task.getAll();
    const ind = tmp.findIndex(
      item => item.id === taskId && item.boardId === boardId
    );
    const tasks = await Task.getAllTask();
    tasks.splice(ind, 1);
    return new Promise((res, rej) => {
      fs.writeFile(
        path.join(__dirname, '../..', 'data', 'tasks.json'),
        JSON.stringify(tasks),
        err => {
          if (err) {
            rej(err);
          } else {
            res();
          }
        }
      );
    });
  }

  static async delTaskInBoard(boardId) {
    const tmp = await Task.getAll();
    const tasks = await Task.getAllTask();
    const ind = [];
    for (const [index, val] of tmp.entries()) {
      if (val.boardId === boardId) ind.push(index);
    }
    ind.reverse().forEach(item => {
      return tasks.splice(item, 1);
    });

    return new Promise((res, rej) => {
      fs.writeFile(
        path.join(__dirname, '../..', 'data', 'tasks.json'),
        JSON.stringify(tasks),
        err => {
          if (err) {
            rej(err);
          } else {
            res();
          }
        }
      );
    });
  }

  static async nulTaskForUser(userId) {
    const tmp = await Task.getAll();
    const tasks = await Task.getAllTask();
    const ind = [];
    for (const [index, val] of tmp.entries()) {
      if (val.userId === userId) ind.push(index);
    }
    ind.forEach(item => {
      const _tmp = JSON.parse(tasks[item]);
      _tmp.userId = 'null';
      tasks[item] = JSON.stringify(_tmp);
    });

    return new Promise((res, rej) => {
      fs.writeFile(
        path.join(__dirname, '../..', 'data', 'tasks.json'),
        JSON.stringify(tasks),
        err => {
          if (err) {
            rej(err);
          } else {
            res();
          }
        }
      );
    });
  }
}

module.exports = Task;

const uuid = require('uuid');
const fs = require('fs');
const path = require('path');
const fakerBoards = require('faker');

class Board {
  constructor(title, columns) {
    this.id = uuid();
    this.title = title || fakerBoards.name.title();
    this.columns = columns || [];
  }

  boardToJSON() {
    return JSON.stringify({
      id: this.id,
      title: this.title,
      columns: this.columns
    });
  }

  async saveBoard() {
    const boards = await Board.getAllBoard();
    boards.push(this.boardToJSON());
    console.log(`... ${this.boardToJSON()}`);
    return new Promise((res, rej) => {
      fs.writeFile(
        path.join(__dirname, '../..', 'data', 'boards.json'),
        JSON.stringify(boards),
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

  static getAllBoard() {
    return new Promise((res, rej) => {
      fs.readFile(
        path.join(__dirname, '../..', 'data', 'boards.json'),
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

  static getAll() {
    return new Promise((res, rej) => {
      fs.readFile(
        path.join(__dirname, '../..', 'data', 'boards.json'),
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
                columns: item.columns
              }))
            );
          }
        }
      );
    });
  }

  static async getBoardId(boardsId) {
    const boards = await Board.getAll();
    return boards.find(item => item.id === boardsId);
  }

  static async changeBoard(boardsId, title, columns) {
    const tmp = await Board.getAll();
    const ind = tmp.findIndex(item => item.id === boardsId);
    const boards = await Board.getAllBoard();
    // console.log(`ind ${ind} ${name} ${login} ${password}`);
    boards[ind] = JSON.stringify({
      id: boardsId,
      title,
      columns
    });
    return new Promise((res, rej) => {
      fs.writeFile(
        path.join(__dirname, '../..', 'data', 'boards.json'),
        JSON.stringify(boards),
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

  static async delBoard(boardsId) {
    const tmp = await Board.getAll();
    const ind = tmp.findIndex(item => item.id === boardsId);
    const boards = await Board.getAllBoard();
    console.log(`del ind ${ind}`);
    boards.splice(ind, 1);
    return new Promise((res, rej) => {
      fs.writeFile(
        path.join(__dirname, '../..', 'data', 'boards.json'),
        JSON.stringify(boards),
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

module.exports = Board;

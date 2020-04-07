const uuid = require('uuid');
const fs = require('fs');
const path = require('path');
const fakerUsers = require('faker');

class User {
  constructor(name, login, password) {
    this.id = uuid();
    this.name = name || fakerUsers.name.firstName();
    this.login = login || fakerUsers.internet.userName();
    this.password = password || fakerUsers.internet.password();
  }

  userToJSON() {
    return JSON.stringify({
      id: this.id,
      name: this.name,
      login: this.login,
      password: this.password
    });
  }

  async saveUser() {
    const users = await User.getAllWithPass();
    users.push(this.userToJSON());
    return new Promise((res, rej) => {
      fs.writeFile(
        path.join(__dirname, '../..', 'data', 'users.json'),
        JSON.stringify(users),
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

  static getAllWithPass() {
    return new Promise((res, rej) => {
      fs.readFile(
        path.join(__dirname, '../..', 'data', 'users.json'),
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
        path.join(__dirname, '../..', 'data', 'users.json'),
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
                name: item.name,
                login: item.login
              }))
            );
          }
        }
      );
    });
  }

  static async getUserId(userId) {
    const users = await User.getAll();
    return users.find(item => item.id === userId);
  }

  static async changeUser(userId, name, login, password) {
    const tmp = await User.getAll();
    const ind = tmp.findIndex(item => item.id === userId);
    const users = await User.getAllWithPass();
    users[ind] = JSON.stringify({
      id: userId,
      name,
      login,
      password
    });
    return new Promise((res, rej) => {
      fs.writeFile(
        path.join(__dirname, '../..', 'data', 'users.json'),
        JSON.stringify(users),
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

  static async delUser(userId) {
    const tmp = await User.getAll();
    const ind = tmp.findIndex(item => item.id === userId);
    const users = await User.getAllWithPass();
    users.splice(ind, 1);
    return new Promise((res, rej) => {
      fs.writeFile(
        path.join(__dirname, '../..', 'data', 'users.json'),
        JSON.stringify(users),
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

module.exports = User;

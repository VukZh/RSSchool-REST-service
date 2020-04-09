const uuid = require('uuid');
class User {
  constructor(name, login, password) {
    this.id = uuid();
    this.name = name || 'userName';
    this.login = login || 'userLogin';
    this.password = password || 'userPassword';
  }

  static toResponse(user) {
    return { id: user.id, name: user.name, login: user.login };
  }
}

module.exports = User;

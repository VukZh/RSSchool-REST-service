const uuid = require('uuid');
class Board {
  constructor(title, columns) {
    this.id = uuid();
    this.title = title || 'title';
    this.columns = columns || [];
  }
}
module.exports = Board;

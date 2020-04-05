const uuid = require('uuid');
const fakerColumns = require('faker');

class Column {
  constructor(title, order) {
    this.id = uuid();
    this.title = title || fakerColumns.name.title();
    this.order = order || fakerColumns.random.number();
  }
}

module.exports = Column;

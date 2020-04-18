const uuid = require('uuid');

const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    name: String,
    login: String,
    password: String,
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

userSchema.statics.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

const User = model('User', userSchema);
// class User {
//   constructor(name, login, password) {
//     this.id = uuid();
//     this.name = name || 'userName';
//     this.login = login || 'userLogin';
//     this.password = password || 'userPassword';
//   }

//   static toResponse(user) {
//     return { id: user.id, name: user.name, login: user.login };
//   }
// }

module.exports = User;

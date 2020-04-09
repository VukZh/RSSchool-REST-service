const User = require('./user.model');

const users = [];

const saveUser = async (name, login, password) => {
  const newUser = new User(name, login, password);
  users.push(newUser);
  return newUser;
};

const getAll = async () => users;

const getUserId = async userId => users.find(user => user.id === userId);

const changeUser = async (userId, name, login, password) => {
  const chUser = await getUserId(userId);
  if (chUser) {
    Object.assign(chUser, { name, login, password });
    return chUser;
  }
  return false;
};

const delUser = async userId => {
  const ind = users.findIndex(item => item.id === userId);
  if (ind !== -1) {
    users.splice(ind, 1);
    return true;
  }
  return false;
};

module.exports = { getAll, getUserId, saveUser, changeUser, delUser };

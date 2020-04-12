const usersRepo = require('./user.memory.repository');
const getAll = () => usersRepo.getAll();

const getUserId = userId => usersRepo.getUserId(userId);

const saveUser = (name, login, password) =>
  usersRepo.saveUser(name, login, password);

const changeUser = (userId, name, login, password) =>
  usersRepo.changeUser(userId, name, login, password);

const delUser = userId => {
  return usersRepo.delUser(userId);
};

module.exports = { getAll, getUserId, saveUser, changeUser, delUser };

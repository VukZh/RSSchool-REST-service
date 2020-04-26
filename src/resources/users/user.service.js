const usersRepo = require('./user.db.repository');
const getAll = () => usersRepo.getAll();

const getUserId = userId => usersRepo.getUserId(userId);

const saveUser = (name, login, password) =>
  usersRepo.saveUser(name, login, password);

const changeUser = (userId, name, login, password) =>
  usersRepo.changeUser(userId, name, login, password);

const delUser = userId => {
  return usersRepo.delUser(userId);
};

const authUser = (login, password) => {
  return usersRepo.authUser(login, password);
};

module.exports = { getAll, getUserId, saveUser, changeUser, delUser, authUser };

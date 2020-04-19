const User = require('./user.model');

const saveUser = async (name, login, password) => {
  return User.create({
    name,
    login,
    password
  });
};

const getAll = async () => {
  return User.find({});
};

const getUserId = async userId => {
  return User.findById(userId);
};

const changeUser = async (userId, name, login, password) => {
  return User.updateOne({ _id: userId }, { userId, name, login, password });
};

const delUser = async userId => {
  return (await User.deleteOne({ _id: userId })).deletedCount;
};

module.exports = { getAll, getUserId, saveUser, changeUser, delUser };

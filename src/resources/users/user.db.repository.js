const User = require('./user.model');

const bcrypt = require('bcryptjs');

const saveUser = async (name, login, password) => {
  const user = await User.findOne({ login });
  if (user) {
    return user;
  }
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

const authUser = async (login, password) => {
  let res = false;
  const user = await User.findOne({ login });
  if (user) {
    // console.log('RES login ' + user);
    res = await bcrypt.compare(password, user.password);
  }
  console.log(`RES ${res}`);
  return res;
};

module.exports = { getAll, getUserId, saveUser, changeUser, delUser, authUser };

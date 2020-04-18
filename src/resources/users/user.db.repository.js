const User = require('./user.model');

// const users = [];

const saveUser = async (name, login, password) => {
  return User.create({
    name,
    login,
    password
  });
  //   const newUser = new User(name, login, password);
  //   users.push(newUser);
  //   return newUser;
  //   const newUser = new User({
  //     name,
  //     login,
  //     password
  //   });
  //   await newUser.save();
  //   throw new Error();
};

const getAll = async () => {
  // users;
  return User.find({});
};

const getUserId = async userId => {
  //   users.find(user => user.id === userId);
  return User.findById(userId);
};

const changeUser = async (userId, name, login, password) => {
  //   const chUser = await getUserId(userId);
  //   if (chUser) {
  //     Object.assign(chUser, { name, login, password });
  //     return chUser;
  //   }
  //   return false;
  //   throw new Error();
  return User.updateOne({ _id: userId }, { userId, name, login, password });
  //   return User.findById(userId);
};

const delUser = async userId => {
  //   const ind = users.findIndex(item => item.id === userId);
  //   if (ind !== -1) {
  //     users.splice(ind, 1);
  //     return true;
  //   }
  //   return false;
  //   throw new Error();
  return (await User.deleteOne({ _id: userId })).deletedCount;
};

module.exports = { getAll, getUserId, saveUser, changeUser, delUser };

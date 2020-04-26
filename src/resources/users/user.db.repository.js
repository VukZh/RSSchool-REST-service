const User = require('./user.model');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config');

const jwtExpirySeconds = 300;

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
  const user = await User.findOne({ login });
  if (user) {
    const checkUser = await bcrypt.compare(password, user.password);
    if (checkUser) {
      const token = jwt.sign(
        {
          userId: user._id,
          login: user.login
        },
        JWT_SECRET_KEY,
        {
          expiresIn: jwtExpirySeconds
        }
      );
      console.log(`token ${token}`);

      return token;
    }
  }

  // console.log('RES ' + res);
  return false;
};

module.exports = { getAll, getUserId, saveUser, changeUser, delUser, authUser };

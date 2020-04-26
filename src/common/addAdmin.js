const User = require('../resources/users/user.model');
const createAdmin = async () => {
  const userAdmin = new User({
    name: 'Admin',
    login: 'admin',
    password: 'admin'
  });
  await userAdmin.save();
};

module.exports = createAdmin;

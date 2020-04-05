const router = require('express').Router();
const User = require('./user.model');
// const usersService = require('./user.service');

router
  .route('/')
  .get(async (req, res) => {
    // console.log('...... ' + JSON.stringify(req.body));
    const users = await User.getAll();
    res.json(users);
  })
  .post(async (req, res) => {
    // console.log('----- ' + JSON.stringify(req.body));
    const user = new User(req.body.name, req.body.login, req.body.password);
    await user.saveUser();
    res.json({ id: user.id, name: user.name, login: user.login });
  });

router
  .route('/:userId')
  .get(async (req, res) => {
    console.log(`!!!!!!  ${req.params.userId}`);
    const user = await User.getUserId(req.params.userId);
    res.json(user);
  })
  .put(async (req, res) => {
    console.log(`!!!!!!  ${req.params.userId}`);
    await User.changeUser(
      req.params.userId,
      req.body.name,
      req.body.login,
      req.body.password
    );
    const user = await User.getUserId(req.params.userId);
    res.json(user);
  })
  .delete(async (req, res) => {
    console.log(`!!!!!!  ${req.params.userId}`);
    await User.delUser();
    // const user = await User.getUserId(req.params.userId);
    res.json();
  });

module.exports = router;

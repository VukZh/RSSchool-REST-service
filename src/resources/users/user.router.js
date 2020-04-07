const router = require('express').Router();
const User = require('./user.model');

router
  .route('/')
  .get(async (req, res) => {
    const users = await User.getAll();
    res.json(users);
  })
  .post(async (req, res) => {
    const user = new User(req.body.name, req.body.login, req.body.password);
    await user.saveUser();
    res.json({ id: user.id, name: user.name, login: user.login });
  });

router
  .route('/:userId')
  .get(async (req, res) => {
    const user = await User.getUserId(req.params.userId);
    if (!user) {
      res.status(404).json('User not found');
    } else {
      res.json(user);
    }
  })
  .put(async (req, res) => {
    await User.changeUser(
      req.params.userId,
      req.body.name,
      req.body.login,
      req.body.password
    );
    const user = await User.getUserId(req.params.userId);
    if (!user) {
      res.status(400).json('Bad request');
    } else {
      res.json(user);
    }
  })
  .delete(async (req, res) => {
    const user = await User.getUserId(req.params.userId);
    if (!user) {
      res.status(404).json('User not found');
    } else {
      await User.delUser(req.params.userId);
      res.status(204).send('The user has been deleted');
    }
  });

module.exports = router;

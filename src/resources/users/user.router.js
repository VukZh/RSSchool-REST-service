const router = require('express').Router();
const User = require('./user.model');

const usersService = require('./user.service');
const tasksService = require('../tasks/task.service');

router
  .route('/')
  .get(async (req, res) => {
    const users = await usersService.getAll();
    const resUsers = users.map(User.toResponse);
    res.status(200).json(resUsers);
  })
  .post(async (req, res) => {
    const resUser = await usersService.saveUser(
      req.body.name,
      req.body.login,
      req.body.password
    );
    res.status(200).json(User.toResponse(resUser));
  });

router
  .route('/:userId')
  .get(async (req, res) => {
    const resUser = await usersService.getUserId(req.params.userId);
    if (resUser) {
      res.status(200).json(User.toResponse(resUser));
    } else {
      res.status(404).json('User not found');
    }
  })
  .put(async (req, res) => {
    const resUser = await usersService.changeUser(
      req.params.userId,
      req.body.name,
      req.body.login,
      req.body.password
    );
    if (resUser) {
      res.status(200).json(User.toResponse(resUser));
    } else {
      res.status(401).json('Access token is missing or invalid');
    }
  })
  .delete(async (req, res) => {
    const delUser = await usersService.delUser(req.params.userId);
    if (delUser) {
      await tasksService.nulTaskForUser(req.params.userId);
      res.status(204).json('The user has been deleted');
    } else {
      res.status(404).json('User not found');
    }
  });

module.exports = router;

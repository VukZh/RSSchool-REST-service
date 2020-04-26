const router = require('express').Router();
// const User = require('./user.model');

const usersService = require('./user.service');
// const tasksService = require('../tasks/task.service');
// const { validationResult, param } = require('express-validator');

router.route('/').post(async (req, res) => {
  const checkUser = await usersService.authUser(
    req.body.login,
    req.body.password
  );

  if (checkUser) {
    res.status(200).json('Successful login');
  } else {
    res.status(403).json('Incorrect login or password');
  }
});

module.exports = router;

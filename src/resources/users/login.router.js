const router = require('express').Router();
const usersService = require('./user.service');

router.route('/').post(async (req, res) => {
  const { login, password } = req.body;

  const token = await usersService.authUser(login, password);

  if (token) {
    res
      .status(200)
      .set('JWT', token)
      .json('Successful login');
  } else {
    res.status(403).json('Incorrect login or password');
  }
});

module.exports = router;

const router = require('express').Router();
const User = require('./user.model');

const usersService = require('./user.service');
const tasksService = require('../tasks/task.service');

const routersMiddleware = require('../../common/routersMiddleware');

const { validationResult, param, body } = require('express-validator');

// router.use((req, res, next) => {
//   console.log('Time: ', Date.now());
//   next();
// });
router
  .route('/')
  .all((req, res, next) => {
    routersMiddleware('users/', req, res, next);
  })
  .get(async (req, res, next) => {
    try {
      const users = await usersService.getAll();
      const resUsers = users.map(User.toResponse);
      res.status(200).json(resUsers);
    } catch (error) {
      return next(error);
    }
  })
  .post(
    [
      body('name').isString(),
      body('login').isString(),
      body('password')
        .isString()
        .isLength({ min: 5 })
    ],
    async (req, res, next) => {
      try {
        const errorReq = validationResult(req);
        if (!errorReq.isEmpty()) {
          throw new TypeError(
            `wrong edit user ${JSON.stringify(errorReq.array())}`
          );
        }
        const resUser = await usersService.saveUser(
          req.body.name,
          req.body.login,
          req.body.password
        );
        res.status(200).json(User.toResponse(resUser));
      } catch (error) {
        return next(error);
      }
    }
  );

router
  .route('/:userId')
  .all((req, res, next) => {
    routersMiddleware('users/:userId', req, res, next);
  })
  .get([param('userId').isUUID()], async (req, res, next) => {
    try {
      const errorReq = validationResult(req);
      if (!errorReq.isEmpty()) {
        throw new TypeError(
          `wrong get user ${JSON.stringify(errorReq.array())}`
        );
      }
      const resUser = await usersService.getUserId(req.params.userId);
      if (resUser) {
        res.status(200).json(User.toResponse(resUser));
      } else {
        res.status(404).json('User not found');
      }
    } catch (error) {
      return next(error);
    }
  })
  .put(
    [
      param('userId').isUUID(),
      body('name').isString(),
      body('login').isString(),
      body('password')
        .isString()
        .isLength({ min: 5 })
    ],
    async (req, res, next) => {
      try {
        const errorReq = validationResult(req);
        if (!errorReq.isEmpty()) {
          throw new TypeError(
            `wrong edit user ${JSON.stringify(errorReq.array())}`
          );
        }
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
      } catch (error) {
        return next(error);
      }
    }
  )
  .delete([param('userId').isUUID()], async (req, res, next) => {
    try {
      const errorReq = validationResult(req);
      if (!errorReq.isEmpty()) {
        throw new TypeError(
          `wrong delete user ${JSON.stringify(errorReq.array())}`
        );
      }
      const delUser = await usersService.delUser(req.params.userId);
      if (delUser) {
        await tasksService.nulTaskForUser(req.params.userId);
        res.status(204).json('The user has been deleted');
      } else {
        res.status(404).json('User not found');
      }
    } catch (error) {
      return next(error);
    }
  });

module.exports = router;

/* eslint-disable no-unused-vars */
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const loginRouter = require('./resources/users/login.router');

const routeLoggerMiddleware = require('./common/routeLoggerMiddleware');

const authMiddleware = require('./common/authMiddleware');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

// app.use(routeLoggerMiddleware); //logging for console and files
app.all('*', authMiddleware);

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards', taskRouter);
app.use('/login', loginRouter);

app.use((err, req, res, next) => {
  console.log(`res status ... ${err}`);
  if (err.name === 'TypeError') {
    res.status(422).json('Invalid UUID');
  } else if (err.name === 'SyntaxError') {
    res.status(400).json('Bad request');
  } else {
    return res.status(500).json('Internal Server Error');
  }
  next();
});

module.exports = app;

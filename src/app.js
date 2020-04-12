/* eslint-disable no-unused-vars */
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const routeLoggerMiddleware = require('./common/routeLoggerMiddleware');

// const winston = require('winston');
// const expressWinston = require('express-winston');

// expressWinston.requestWhitelist.push('body');
// expressWinston.responseWhitelist.push('body');
// const { finished } = require('stream');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// app.use(express.bodyParser());

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

// ////////////////
// app.use((req, res, next) => {
//   const { method, url, body } = req;
//   console.log(
//     `Start - Main Request ... method=${method} url=${url} reqBody=${JSON.stringify(
//       body
//     )}`
//   );
//   const start = Date.now();

//   res.on('finish', () => {
//     const ms = Date.now() - start;
//     console.log(res);
//     console.log(
//       `End - Main Response ... status=${res.statusCode} resBody=${res.data} [${ms}ms]`
//     );
//   });

//   // const start = Date.now();

//   next();

//   // finished(res, () => {
//   //   const ms = Date.now() - start;
//   //   // const { status } = req;
//   //   console.log(
//   //     `End - Main Response ... status=${res.statusCode} resBody=${resBody} [${ms}ms]`
//   //   );
//   // });
// });

// /////////////////

// app.use((req, res, next) => {console.log('>>>>>>>>>> ' + res.status()); next()})

// app.use((req, res) => {
//   setTimeout(() => {
//     res.status(201).send("Hello world");
//   }, 200);
// });
// ////////////////////

// app.use(routeLoggerMiddleware);

app.use('/users', routeLoggerMiddleware, userRouter);
app.use('/boards', routeLoggerMiddleware, boardRouter);
app.use('/boards', routeLoggerMiddleware, taskRouter);

// app.use((req, res, next) => {console.log('>>>>>>>>>> ' + res.status())})
app.use((err, req, res, next) => {
  // console.log(`ERROR ,,, ${err.name}`);
  console.log(`ERROR ... ${err}`);
  if (err.name === 'TypeError') {
    res.status(422).json('Invalid request parameters');
  } else if (err.name === 'SyntaxError') {
    res.status(400).json('Bad request');
  } else {
    return res.status(500).json('Internal Server Error');
  }

  // res.json(err);
  // }
  // // console.log(`ERROR ... ${err}`);
  // next();
});

module.exports = app;

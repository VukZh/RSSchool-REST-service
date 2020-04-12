const { PORT } = require('./common/config');
const app = require('./app');

const uncaughtException = require('./common/uncaughtException');
const unhandledRejection = require('./common/unhandledRejection');

uncaughtException();
unhandledRejection();

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
// ////////////////////////////////// RUN uncaughtException

// throw new Error('...uncaughtException...');

// ////////////////////////////////// RUN unhandledRejection

// setTimeout(() => {
//   Promise.reject(new Error('...unhandledRejection...'));
// }, 3333);

const { PORT } = require('./common/config');
const app = require('./app');
const uncaughtException = require('./common/uncaughtException');
const unhandledRejection = require('./common/unhandledRejection');
const connectError = require('./common/connectError');
const connectDB = require('./common/connectDB');

uncaughtException();
unhandledRejection();

function start() {
  try {
    connectDB(() => {
      app.listen(PORT, () =>
        console.log(`App is running on http://localhost:${PORT}`)
      );
    });
  } catch (error) {
    connectError(error);
  }
}

start();

// ////////////////////////////////// RUN uncaughtException

// throw new Error('...uncaughtException...');

// ////////////////////////////////// RUN unhandledRejection

// setTimeout(() => {
//   Promise.reject(new Error('...unhandledRejection...'));
// }, 3333);

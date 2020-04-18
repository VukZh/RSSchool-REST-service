const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');
const mongoose = require('mongoose');

const app = require('./app');

const uncaughtException = require('./common/uncaughtException');
const unhandledRejection = require('./common/unhandledRejection');
const connectError = require('./common/connectError');

uncaughtException();
unhandledRejection();

// console.log(`MONGO_CONNECTION_STRING ${MONGO_CONNECTION_STRING}`)

async function start() {
  try {
    await mongoose.connect(MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    app.listen(PORT, () =>
      console.log(`App is running on http://localhost:${PORT}`)
    );
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

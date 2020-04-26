const uncaughtException = require('./common/uncaughtException');
const unhandledRejection = require('./common/unhandledRejection');
const connectDB = require('./common/connectDB');

uncaughtException();
unhandledRejection();

connectDB();

// ////////////////////////////////// RUN uncaughtException

// throw new Error('...uncaughtException...');

// ////////////////////////////////// RUN unhandledRejection

// setTimeout(() => {
//   Promise.reject(new Error('...unhandledRejection...'));
// }, 3333);

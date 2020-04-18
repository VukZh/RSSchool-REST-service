const { PORT } = require('./common/config');
// const mongoose = require('mongoose');
// const User = require('./resources/users/user.model');

const app = require('./app');

const uncaughtException = require('./common/uncaughtException');
const unhandledRejection = require('./common/unhandledRejection');
const connectError = require('./common/connectError');
const connectDB = require('./common/connectDB');

// connectDB

uncaughtException();
unhandledRejection();

// console.log(`MONGO_CONNECTION_STRING ${MONGO_CONNECTION_STRING}`)

function start() {
  try {
    connectDB(() => {
      app.listen(PORT, () =>
        console.log(`App is running on http://localhost:${PORT}`)
      );
    });
    // const db = await mongoose.connection;
    // db.on('open', () => {
    //   // db.dropDatabase();y
    //   const u1 = new User({ name: 'N1', login: 'L1', password: 'pass1' });
    //   // u1.save();
    //   User.insertMany([u1]);
    //   // User.insertMany([u1]);
    //   // User
    //   console.log('connect!!');
    // });
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

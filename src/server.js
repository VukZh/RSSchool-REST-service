// const { PORT } = require('./common/config');
// const app = require('./app');
const uncaughtException = require('./common/uncaughtException');
const unhandledRejection = require('./common/unhandledRejection');
// const connectError = require('./common/connectError');
const connectDB = require('./common/connectDB');
// const addAdmin = require('./common/addAdmin');
// const mongoose = require('mongoose');
// const { MONGO_CONNECTION_STRING } = require('./common/config');

uncaughtException();
unhandledRejection();

// async function start() {
//   try {
//     await mongoose.connect(MONGO_CONNECTION_STRING, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     });
//     const db = mongoose.connection;

//     await db.dropDatabase();
//     await addAdmin();
//     app.listen(PORT, () => {
//       console.log(`App is running on http://localhost:${PORT}`);
//     });
//   } catch (error) {
//     connectError(error);
//   }
// }

connectDB();

// ////////////////////////////////// RUN uncaughtException

// throw new Error('...uncaughtException...');

// ////////////////////////////////// RUN unhandledRejection

// setTimeout(() => {
//   Promise.reject(new Error('...unhandledRejection...'));
// }, 3333);

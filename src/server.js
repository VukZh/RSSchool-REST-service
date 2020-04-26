const uncaughtException = require('./common/uncaughtException');
const unhandledRejection = require('./common/unhandledRejection');
const connectDB = require('./common/connectDB');

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

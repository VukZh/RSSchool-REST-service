const { PORT } = require('./common/config');
const app = require('./app');

// process.on('unhandledRejection', (reason, promise) => {
//   console.error('-=-=-=-=-=- Unhandled Rejection at:', reason.stack || reason);
// })

// process.on('uncaughtException', (err) => {
//   console.log(`-=-=-=-=-=- Caught exception: ${err}`);
// });

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);

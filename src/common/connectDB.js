const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('./config');

const connectDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = mongoose.connection;
  db.dropDatabase();
  db.once('open', () => {
    // console.log('DB connected...');
    cb();
  });
};

module.exports = connectDB;

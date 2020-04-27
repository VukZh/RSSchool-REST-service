const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('./config');
const addAdmin = require('./addAdmin');
const { PORT } = require('../common/config');
const app = require('../app');
const connectError = require('./connectError');

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    const db = mongoose.connection;
    await db.dropDatabase();
    await addAdmin();
    app.listen(PORT, () => {
      console.log(`App is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    connectError(error);
  }
};

module.exports = connectDB;

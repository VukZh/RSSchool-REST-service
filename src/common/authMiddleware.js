const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('./config');

const auth = (req, res, next) => {
  const token = req.headers['JWT'];
  if (!token) {
    res.status(401).json('Access token is missing or invalid');
  } else {
    jwt.verify(token, JWT_SECRET_KEY, err => {
      if (err) {
        res.status(401).json('Access token is missing or invalid');
      } else {
        // eslint-disable-next-line callback-return
        next();
      }
    });
  }
};
module.exports = auth;

/* eslint-disable no-else-return */
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('./config');

const auth = (req, res, next) => {
  if (!req.url.includes('/login')) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json('Access token is missing or invalid');
    } else {
      jwt.verify(token.substr(7), JWT_SECRET_KEY, err => {
        if (err) {
          return res.status(401).json('Access token is missing or invalid');
        }
      });
    }
  }
  next();
};
module.exports = auth;

const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('./config');

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  //   console.log('>> token >> ' + token);

  if (!token) {
    res.status(401).json('Access token is missing or invalid');
  } else {
    // console.log('>> token >> ' + typeof req.headers.authorization);
    jwt.verify(token.substr(7), JWT_SECRET_KEY, err => {
      if (err) {
        // console.log('>> ERR >> ');
        res.status(401).json('Access token is missing or invalid');
      } else {
        // eslint-disable-next-line callback-return
        next();
      }
    });
  }
};
module.exports = auth;

const { format, transports } = require('winston');
const expressWinston = require('express-winston');
const path = require('path');

expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');

const routerLogger = expressWinston.logger({
  transports: [
    new transports.Console({
      level: 'silly',
      format: format.combine(
        format.timestamp(),
        format.colorize(),
        format.cli()
      )
    }),
    new transports.File({
      filename: path.join(__dirname, '..', '..', 'logs', 'info.log'),
      level: 'info',
      format: format.combine(
        format.timestamp(),
        format.uncolorize(),
        format.json()
      )
    }),
    new transports.File({
      filename: path.join(__dirname, '..', '..', 'logs', 'warn.log'),
      level: 'warn',
      format: format.combine(
        format.timestamp(),
        format.uncolorize(),
        format.json()
      )
    }),
    new transports.File({
      filename: path.join(__dirname, '..', '..', 'logs', 'error.log'),
      level: 'error',
      format: format.combine(
        format.timestamp(),
        format.uncolorize(),
        format.json()
      )
    })
  ],
  meta: true, // optional: control whether you want to log the meta data about the request (default to true)
  msg: 'HTTP {{req.method}} {{req.url}}', // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: true, // Use the default Express/morgan request formatting, with the same colors. Enabling this will override any msg and colorStatus if true. Will only output colors on transports with colorize set to true
  colorStatus: true, // Color the status code, using the Express/morgan color palette (default green, 3XX cyan, 4XX yellow, 5XX red). Will not be recognized if expressFormat is true
  statusLevels: false, // default value
  level(req, res) {
    let lvl = 'silly';
    if (res.statusCode >= 100) {
      lvl = 'info';
    }
    if (res.statusCode >= 400) {
      lvl = 'warn';
    }
    if (res.statusCode >= 500) {
      lvl = 'error';
    }
    return lvl;
  }
});

module.exports = routerLogger;

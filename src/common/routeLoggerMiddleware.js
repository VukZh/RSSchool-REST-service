const { format, transports } = require('winston');
const expressWinston = require('express-winston');
const path = require('path');

expressWinston.requestWhitelist.push('body');
expressWinston.responseWhitelist.push('body');

const routerLogger = expressWinston.logger({
  transports: [
    new transports.Console({
      level: 'info',
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
        format.simple()
      )
    }),
    new transports.File({
      filename: path.join(__dirname, '..', '..', 'logs', 'warn.log'),
      level: 'warn',
      format: format.combine(
        format.timestamp(),
        format.uncolorize(),
        format.simple()
      )
    }),
    new transports.File({
      filename: path.join(__dirname, '..', '..', 'logs', 'error.log'),
      level: 'error',
      format: format.combine(
        format.timestamp(),
        format.uncolorize(),
        format.splat()
      )
    })
  ],
  meta: true,
  msg: 'HTTP  ',
  expressFormat: true,
  colorStatus: true,
  statusLevels: false,
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

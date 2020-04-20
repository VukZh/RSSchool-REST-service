/* eslint-disable no-process-exit */
/* eslint-disable no-sync */

const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

const ur = () =>
  process.on('unhandledRejection', reason => {
    fs.appendFileSync(
      path.join(__dirname, '..', '..', 'logs', 'error.log'),
      `{Caught unhandled Rejection at: ${reason.stack ||
        reason},"timestamp":${new Date().toISOString()}}\n`
    );
    console.error(
      chalk.red.dim(
        `{Caught unhandled Rejection at: ${reason.stack ||
          reason},"timestamp":${new Date().toISOString()}}\n`
      )
    );
  });

module.exports = ur;

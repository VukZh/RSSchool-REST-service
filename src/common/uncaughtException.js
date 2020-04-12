/* eslint-disable spaced-comment */
/* eslint-disable no-process-exit */
/* eslint-disable no-sync */

const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

const ux = () =>
  process.on('uncaughtException', err => {
    console.error(
      chalk.red.dim(
        `{Caught exception: ... with err.stack: ${
          err.stack
        },"timestamp":${new Date().toISOString()}}\n`
      )
    );

    fs.appendFileSync(
      path.join(__dirname, '..', '..', 'logs', 'error.log'),
      `{Caught exception: ... with err.stack: ${
        err.stack
      },"timestamp":${new Date().toISOString()}}\n`
    );
    process.exit(1);
  });

module.exports = ux;

/* eslint-disable no-sync */

const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

const ce = msg => {
  fs.appendFileSync(
    path.join(__dirname, '..', '..', 'logs', 'error.log'),
    `{Error connection with MongoDB: ${msg} ${new Date().toISOString()}}\n`
  );
  console.error(
    chalk.red.dim(
      `{Error connection with MongoDB: ${msg} ${new Date().toISOString()}}\n`
    )
  );
};

module.exports = ce;

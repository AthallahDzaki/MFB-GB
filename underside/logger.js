/* eslint node/exports-style: off */
/*
  Logger class for easy and aesthetically pleasing console logging
*/

const chalk = require('chalk'),
      moment = require('moment');

exports.log = (content, type = 'LOG') => {
  const timestamp = `[${moment().format('YYYY-MM-DD HH:mm:ss')}]:`;
  switch (type) {
    case 'LOG': {
      return console.log(`${timestamp} ${chalk.bold.bgBlueBright(type.toUpperCase())} ${content} `);
    }
    case 'WAR': {
      return console.error(chalk.yellowBright(`${timestamp} ${chalk.black.bgYellowBright(type.toUpperCase())} ${content} `));
    }
    case 'ERR': {
      return console.error(chalk.redBright.bgWhite(`${timestamp} ${chalk.white.bold.bgRedBright(type.toUpperCase())} ${content} `));
    }
    case 'DBG': {
      return console.log(`${timestamp} ${chalk.bold.green(type.toUpperCase())} ${content} `);
    }
    case 'CMD': {
      return console.log(`${timestamp} ${chalk.black.bgWhite(type.toUpperCase())} ${content}`);
    }
    case 'RDY': {
      return console.log(`${timestamp} ${chalk.black.bgGreen(type.toUpperCase())} ${content}`);
    }
    default: throw new TypeError('Logger type must be either WAR, DBG, LOG, RDY, CMD or ERR.');
  }
};

exports.error = (...args) => this.log(...args, 'ERR');

exports.warn = (...args) => this.log(...args, 'WAR');

exports.debug = (...args) => this.log(...args, 'DBG');

exports.cmd = (...args) => this.log(...args, 'CMD');

'use strict';

const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
};

const logLevels = ['debug', 'info', undefined];

const checkLogLevel = (logLevel) => {
  if (logLevels.includes(logLevel)) {
    return;
  }
  throw Error(`${logLevel} is not a log level`);
};

const Logger = (logLevel) => {
  checkLogLevel(logLevel);

  const now = () => (new Date().toISOString() + ' ');

  const logger = {
    info: (text) => {
      console.info(colors.green, now(), text);
    },
    debug: (obj) => {
      if (logLevel !== 'debug') {
        return;
      }
      if (typeof obj === 'string') {
        console.log(colors.cyan, now(), obj);
      } else {
        console.log(colors.cyan, now(), JSON.stringify(obj, null, 2));
      }
    },
    error: (text) => {
      console.log(colors.red);
      console.trace(colors.red, now(), text);
    },
    warn: (text) => {
      console.warn(colors.yellow, now(), text);
    }
  };

  return logger;
};

module.exports = Logger;

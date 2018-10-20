const path = require('path');
const log4js = require('log4js');

exports.init = function (logPath) {
  logPath = logPath || './build/logs';

  log4js.configure({
    appenders: {
      console: {
        type: 'console'
      },
      http: {
        type: 'file',
        filename: path.join(logPath, 'access.log'),
        maxLogSize: 1024 * 1024 * 50 // 50MB
      },
      mockstar: {
        type: 'file',
        filename: path.join(logPath, 'mockstar.log'),
        maxLogSize: 1024 * 1024 * 50 // 50MB
      },
      attention: {
        type: 'file',
        filename: path.join(logPath, 'attention.log'),
        maxLogSize: 1024 * 1024 * 50 // 50MB
      }
    },
    categories: {
      default: { appenders: ['console'], level: 'info' },
      http: { appenders: ['console', 'http'], level: 'trace' },
      mockstar: { appenders: ['console', 'mockstar'], level: 'trace' },
      attention: { appenders: ['console', 'attention'], level: 'trace' }
    }
  });
};

exports.connectLogger = function () {
  // return log4js.connectLogger(this.logger('http'), { level: 'auto', format: ':method :url' });
  // https://github.com/nomiddlename/log4js-example/blob/master/app.js
  return log4js.connectLogger(this.logger('http'), { level: 'auto' });
};

exports.logger = function (name) {
  const logger = log4js.getLogger(name);

  // logger.setLevel('INFO');

  return logger;
};

exports.mockstarLogger = function () {
  return this.logger('mockstar');
};

exports.attentionLogger = function () {
  return this.logger('attention');
};

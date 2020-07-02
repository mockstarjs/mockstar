import path from 'path';
import log4js from 'log4js';

export function init(logPath: string) {
  logPath = logPath || './build/logs';

  log4js.configure({
    appenders: {
      console: {
        type: 'console',
      },
      http: {
        type: 'file',
        filename: path.join(logPath, 'access.log'),
        maxLogSize: 1024 * 1024 * 50, // 50MB
      },
      mockstar: {
        type: 'file',
        filename: path.join(logPath, 'mockstar.log'),
        maxLogSize: 1024 * 1024 * 50, // 50MB
      },
      attention: {
        type: 'file',
        filename: path.join(logPath, 'attention.log'),
        maxLogSize: 1024 * 1024 * 50, // 50MB
      },
    },
    categories: {
      default: {appenders: ['console'], level: 'info'},
      http: {appenders: ['console', 'http'], level: 'trace'},
      mockstar: {appenders: ['console', 'mockstar'], level: 'trace'},
      attention: {appenders: ['console', 'attention'], level: 'trace'},
    },
  });
}

export function connectLogger() {
  // return log4js.connectLogger(this.logger('http'), { level: 'auto', format: ':method :url' });
  // https://github.com/nomiddlename/log4js-example/blob/master/app.js
  // @ts-ignore
  return log4js.connectLogger(this.logger('http'), {level: 'auto'});
}

export function logger(name: string) {
  const logger = log4js.getLogger(name);

  // logger.setLevel('INFO');

  return logger;
}

export function mockstarLogger() {
  // @ts-ignore
  return this.logger('mockstar');
}

export function attentionLogger() {
  // @ts-ignore
  return this.logger('attention');
}

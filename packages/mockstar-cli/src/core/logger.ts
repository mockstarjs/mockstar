import fs from 'hexo-fs';
import path from 'path';
import osenv from 'osenv';
import bunyan, { Stream } from 'bunyan';
import chalk from 'chalk';
import { Writable } from 'stream';
import { formatDate } from '../utils';

interface CreateLoggerOpts {
  silent?: boolean;
  debug?: boolean;
  name?: string;
}

export interface MineLogger extends bunyan {
  d?: (obj: Object, ...params: any[]) => void;
  i?: (obj: Object, ...params: any[]) => void;
  w?: (obj: Object, ...params: any[]) => void;
  e?: (obj: Object, ...params: any[]) => void;
  log?: (obj: Object, ...params: any[]) => void;
}

const levelNames = {
  10: 'TRACE',
  20: 'DEBUG',
  30: 'INFO ',
  40: 'WARN ',
  50: 'ERROR',
  60: 'FATAL',
};

const levelColors = {
  10: 'gray',
  20: 'gray',
  30: 'green',
  40: 'bgYellow',
  50: 'bgRed',
  60: 'bgRed',
};

class ConsoleStream extends Writable {
  debug: boolean;

  constructor(env: { debug?: boolean }) {
    super({ objectMode: true });

    this.debug = !!env.debug;
  }

  _write(data: any, encoding: BufferEncoding, callback: (error?: Error | null) => void) {
    const level: number = data.level;
    let msg = '';
    // Time
    if (this.debug) {
      msg += chalk.gray(formatDate('yyyy-MM-dd hh:mm:ss', data.time)) + ' ';
    }

    // Level
    // @ts-ignore
    msg += chalk[levelColors[level]]('MockStar' + ' ' + levelNames[level]) + ' ';

    // Message
    msg += data.msg + '\n';

    // Error
    if (data.err) {
      const err = data.err.stack || data.err.message;
      if (err) msg += chalk.yellow(err) + '\n';
    }

    if (level >= 40) {
      process.stderr.write(msg);
    } else {
      process.stdout.write(msg);
    }

    if (!this.debug) {
      const logDir = path.join(osenv.home(), './.mockstar/logs');
      const today = formatDate('yyyy-MM-dd', new Date());
      const logPath = path.join(logDir, `${today}.log`);
      fs.appendFileSync(logPath, msg);
    }

    callback();
  }
}

export function createLogger(options: CreateLoggerOpts = {}) {
  options = options;

  const streams: Stream[] = [];

  if (!options.silent) {
    streams.push({
      type: 'raw',
      level: options.debug ? 'trace' : 'info',
      stream: new ConsoleStream(options),
    });
  }

  if (options.debug) {
    streams.push({
      level: 'trace',
      path: 'debug.log',
    });
  }

  const logger: MineLogger = bunyan.createLogger({
    name: options.name || 'mockstar',
    streams: streams,
    serializers: {
      err: bunyan.stdSerializers.err,
    },
  });

  // Alias for logger levels
  logger.d = logger.debug;
  logger.i = logger.info;
  logger.w = logger.warn;
  logger.e = logger.error;
  logger.log = logger.info;

  return logger;
}

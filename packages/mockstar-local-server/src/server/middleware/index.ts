import express from 'express';
import cors from 'cors';
import compression from 'compression';
import errorhandler from 'errorhandler';
import objectAssign from 'object-assign';
import cookieParser from 'cookie-parser';
import { getStaticDir } from 'mockstar-webui';

interface Opts {
  noGzip?: boolean;
  noCors?: boolean;
  static: string;
  readOnly: boolean;
}

export default function (opts?: Opts) {
  // const userDir = path.join(process.cwd(), 'public');
  // const defaultDir = path.join(__dirname, '../../www/static');
  // const staticDir = fs.existsSync(userDir)
  //   ? userDir
  //   : defaultDir;

  const staticDir = getStaticDir();

  opts = objectAssign({ logger: true, static: staticDir }, opts);

  const arr: (express.Handler | express.ErrorRequestHandler)[] = [];

  // Compress all requests
  if (!opts.noGzip) {
    arr.push(compression());
  }

  // Logger，使用 log4js 来代替
  // if (opts.logger) {
  //   arr.push(
  //     logger('dev', {
  //       skip: (req) => (
  //         process.env.NODE_ENV === 'test' ||
  //         req.path === '/favicon.ico'
  //       )
  //     })
  //   );
  // }

  // Enable CORS for all the requests, including static files
  if (!opts.noCors) {
    arr.push(cors({ origin: true, credentials: true }));
  }

  if (process.env.NODE_ENV === 'development') {
    // only use in development
    arr.push(errorhandler());
  }

  // Serve static files
  arr.push(express.static(opts.static));

  // No cache for IE
  // https://support.microsoft.com/en-us/kb/234067
  arr.push(((req, res, next) => {
    res.header('Cache-Control', 'no-cache');
    res.header('Pragma', 'no-cache');
    res.header('Expires', '-1');
    next();
  }) as express.Handler);

  // Read-only
  if (opts.readOnly) {
    arr.push(((req, res, next) => {
      if (req.method === 'GET') {
        next(); // Continue
      } else {
        res.sendStatus(403); // Forbidden
      }
    }) as express.Handler);
  }

  // cookie
  arr.push(cookieParser());

  return arr;
}

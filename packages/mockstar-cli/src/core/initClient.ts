import fs from 'hexo-fs';
import {MockStar} from './index';
import {MineLogger} from './logger';

/**
 * Init mockstar client, including ~/.mockstar, ~/.mockstar/package.json, ~/.mockstar/.mockstarrc.yml
 */
class Client {
  // 上下文
  ctx: MockStar;
  // logger
  log: MineLogger;

  constructor(ctx: MockStar) {
    this.ctx = ctx;
    this.log = ctx.log;
  }

  initHome() {
    const ctx = this.ctx;
    const {baseDir} = ctx;

    return new Promise(resolve => {
      if (fs.existsSync(baseDir) && fs.statSync(baseDir).isFile()) {
        fs.unlinkSync(baseDir);
      }

      fs.ensurePathSync(baseDir);
      // 注意 fs.existsSync('.mockstar/') 与 fs.existsSync('.mockstar') 结果不一样
      // if (!fs.existsSync(baseDir)) {
      //   log.info('检测到这是您第一次使用mockstar，即将进行cli client初始化');
      //
      //   fs.mkdirsSync(baseDir);
      // }

      this.log.debug('.mockstar 目录已经创建');
      resolve(ctx);
    });
  }

  initPkg() {
    const ctx = this.ctx;
    const {pkgPath} = ctx;

    return new Promise(resolve => {
      if (!fs.existsSync(pkgPath)) {
        fs.writeFileSync(
          pkgPath,
          JSON.stringify(
            {
              name: 'mockstar-home',
              version: '0.0.0',
              private: true,
            },
            null,
            4,
          ),
        );
      }

      this.log.debug('.mockstar/package.json 文件已经创建');
      resolve(ctx);
    });
  }

  initLogs() {
    const ctx = this.ctx;
    const {logDir} = ctx;

    return new Promise(resolve => {
      fs.ensurePathSync(logDir);

      this.log.debug('.mockstar/logs 日志文件夹已经创建');
      resolve(ctx);
    });
  }
}

export default function (ctx: MockStar) {
  const client = new Client(ctx);

  return Promise.all([client.initHome(), client.initPkg(), client.initLogs()]);
}

import path from 'path';
import { showRunningStatus, start } from 'mockstar-starting';
import { Base } from './base';
import getStartArgs from './biz/get-args';
import { MockStar } from '../core';
import { Command } from '../core/command';
import { Argv } from '../types';

// 启动脚本路径
const BOOTSTRAP_PATH = path.join(__dirname, './biz/start-by-cp.js');

export class Start implements Base {
  desc: string;
  options: Record<string, unknown>;

  constructor() {
    this.desc = '';
    this.options = {};
  }

  setInfo(desc: string, options: Record<string, unknown>): void {
    this.desc = desc;
    this.options = options;
  }

  register(cmd: Command): void {
    cmd.register('start', 'Start a background service', {}, this);
  }

  async call(m: MockStar, args: Argv): Promise<void> {
    // console.log(args);

    // 获取参数
    const configOpts = getStartArgs(args);

    if (!configOpts) {
      return Promise.reject('configOpts is null');
    }

    // 启动本地服务
    if (configOpts.isDev) {
      console.log('Ready to start local server!', configOpts);
    }

    return new Promise((resolve, reject) => {
      start(configOpts, [BOOTSTRAP_PATH], function (err, config) {
        // 启动成功
        if (!err || err === true) {
          showRunningStatus(m.version, config, configOpts?.isDev as boolean);

          return resolve();
        }

        if (/listen EADDRINUSE/.test(err)) {
          m.log.error(
            '[!] Failed to bind proxy port ' + configOpts?.port + ': The port is already in use',
          );
          m.log.info('[i] Please check if ' + configOpts?.rootPath + ' is already running');
          m.log.info(
            '    or if another application is using the port, you can change the port with mockstar start -p newPort\n',
          );
          // @ts-ignore
        } else if (err.code == 'EACCES' || err.code == 'EPERM') {
          m.log.error('[!] Cannot start ' + configOpts?.rootPath + ' owned by root');
          m.log.info('[i] Try to run command with `sudo`\n');
        }

        // @ts-ignore
        m.log.error(err.stack ? 'Date: ' + new Date().toLocaleString() + '\n' + err.stack : err);

        reject();
      });
    });
  }
}

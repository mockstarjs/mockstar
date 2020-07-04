import {Base} from './base';
import {startServer} from './biz/local-server/index';
import getRunArgs from './biz/get-args';
import {MockStar} from '../core';
import {Command} from '../core/command';
import {Argv} from '../types';

export class Run implements Base {
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
    cmd.register('run', 'Start a front service', {}, this);
  }

  async call(m: MockStar, args: Argv): Promise<void> {
    // 获取参数
    const configOpts = getRunArgs(args);

    if (!configOpts) {
      return Promise.reject();
    }

    // 启动本地服务
    if (configOpts.isDev) {
      console.log('Ready to start local server!', configOpts);
    }

    startServer(configOpts);
  }
}

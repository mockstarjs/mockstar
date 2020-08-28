import path from 'path';
import fs from 'fs-extra';
import osenv from 'osenv';
import chalk from 'chalk';
import { Argv } from '../types';
import { createLogger, MineLogger } from './logger';
import { Command } from './command';
import initClient from './initClient';
import { Base } from '../internal/base';

const sep = path.sep;

/**
 * A command line tool aims to improve front-end engineer workflow.
 *
 */
export class MockStar {
  version: string;
  // 基本路径
  baseDir: string;
  // 配置文件路径
  rcPath: string;
  // package.json 路径
  pkgPath: string;
  // 插件路径
  pluginDir: string;
  // log 文件夹路径
  logDir: string;
  // 配置
  config: Record<string, unknown>;
  // logger 实例
  log: MineLogger;
  // 命令容器类
  cmd: Command;

  /**
   * Set root and plugin path, context variable include log, cli command object.
   * @param args
   */
  constructor(args: Argv = {}) {
    args = args || {};

    // 读取版本号
    const packageJson = fs.readJSONSync(path.resolve(__dirname, '../../package.json'));
    this.version = packageJson.version || '1.1.6';

    const base = path.join(osenv.home(), './.mockstar');
    const rcPath = path.join(base, '.mockstarrc.yml');

    this.baseDir = base + sep;
    this.rcPath = rcPath;
    this.pkgPath = path.join(base, 'package.json');
    this.pluginDir = path.join(base, 'node_modules') + sep;
    this.logDir = path.join(base, 'logs');

    this.config = {};

    this.log = createLogger({
      debug: Boolean(args.debug),
      silent: Boolean(args.silent),
    });

    this.cmd = new Command();
  }

  /**
   * Read config and load internal and external plugins.
   */
  init(pluginList: Base[] = []) {
    const self = this;

    this.log.debug('MockStar version: %s', chalk.magenta(this.version));

    // Load internal plugins
    if (Array.isArray(pluginList)) {
      pluginList.forEach(plugin => {
        plugin.register(this.cmd);
      });
    }

    // Init client and load external plugins
    return initClient(this).then(function () {
      // Init success
      self.log.debug('init success!');
    });
  }

  /**
   * Call a command in console.
   * @param name
   * @param args
   * @param callback
   */
  call(name: string, callback: (err: Error | null, ...args: any[]) => void): Promise<void>;
  call(
    name: string,
    args: Argv,
    callback: (err: Error | null, ...args: any[]) => void,
  ): Promise<void>;
  async call(
    name: string,
    args: Argv | ((err: Error | null, ...args: any[]) => void),
    callback?: (err: Error | null, ...args: any[]) => void,
  ): Promise<void> {
    if (!callback && typeof args === 'function') {
      callback = args;
      args = {};
    }

    try {
      const c = this.cmd.get(name);

      if (c) {
        const res = c.call(this, args as Argv);
        // @ts-ignore
        callback(null, res);
      } else {
        throw new Error('Command `' + name + '` has not been registered yet!');
      }
    } catch (err) {
      // @ts-ignore
      callback(err);
    }
  }
}

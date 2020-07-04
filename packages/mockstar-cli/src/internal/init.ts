import meow from 'meow';
import {Base} from './base';
import initProject from './biz/generators/project';
import initMocker from './biz/generators/project';
import {MockStar} from '../core';
import {Command} from '../core/command';
import {Argv} from '../types';

export class Init implements Base {
  desc: string;
  options: Record<string, unknown>;

  constructor() {
    this.desc = '';
    this.options = {};
  }

  /**
   * 展示帮助信息
   */
  private showHelp() {
    let arr = [];

    arr.push('    Usage: mockstar init <command> [options] ');
    arr.push('    Commands:');
    arr.push('        project    Initialize project.');
    arr.push('        mocker     Initialize mocker.');
    arr.push('    Options:');
    arr.push('        --dev                  Debug for development.');
    arr.push('    Report bugs to https://github.com/mockstarjs/mockstar/issues.');

    // https://www.npmjs.com/package/meow
    return meow({
      description: false,
      help: arr.join('\n'),
    }).showHelp(0);
  }

  /**
   * 初始化项目
   * @param args
   */
  private initProject(args: Argv): Promise<void> {
    const options = {
      isDev: !!args.dev,
      autoInstall: true,
      cwd: process.cwd(),
    };

    return new Promise((resolve, reject) => {
      initProject(options, (isSuccess, data) => {
        isSuccess ? resolve() : reject();
      });
    });
  }

  private initMocker(args: Argv): Promise<void> {
    const options = {
      isDev: !!args.dev,
      cwd: process.cwd(),
    };

    return new Promise((resolve, reject) => {
      initMocker(options, (isSuccess, data) => {
        isSuccess ? resolve() : reject();
      });
    });
  }

  setInfo(desc: string, options: Record<string, unknown>): void {
    this.desc = desc;
    this.options = options;
  }

  register(cmd: Command): void {
    cmd.register('init', 'Initialize project', {}, this);
  }

  async call(m: MockStar, args: Argv): Promise<void> {
    if (!args._?.length) {
      return this.showHelp();
    }

    const command = args._[0];

    switch (command) {
      case 'project':
        return this.initProject(args);
      case 'mocker':
        return this.initMocker(args);
      default:
        return this.showHelp();
    }
  }
}

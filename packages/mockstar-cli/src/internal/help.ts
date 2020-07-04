import meow from 'meow';
import {Base} from './base';
import {MockStar} from '../core';
import {Command} from '../core/command';
import {Argv} from '../types';

export class Help implements Base {
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
    cmd.register('help', 'Get help on a command.', {}, this);
  }

  async call(m: MockStar, args: Argv): Promise<void> {
    let arr: string[] = [];

    // 如果不是 -h 或者 --help 命令过来的，则需要提示命令不存在
    if (!args.h && !args.help) {
      arr.push('    WARNING: Command is NOT exist!');
      arr.push('\n');
    }

    arr.push('    Usage: mockstar <command> [options] ');
    arr.push('\n');
    arr.push('    Commands:');
    arr.push('        start    Start a background service.');
    arr.push('        run      Start a front service.');
    arr.push('        status   Show the running status of MockStar.');
    arr.push('        stop   Stop current background service.');
    arr.push('        init     Initialize project.');
    arr.push('\n');
    arr.push('    Options:');
    arr.push('        -v, --version          Print mockstar version.');
    arr.push('        -h, --help             Print help information.');
    arr.push(
      '        -w, --watch            Enter watch mode, which rebuilds or restart server on file change.',
    );
    arr.push('        --dev                  Debug for development.');
    arr.push('\n');
    arr.push('    Report bugs to https://github.com/mockstarjs/mockstar/issues.');
    arr.push('\n');

    // https://www.npmjs.com/package/meow
    return meow({
      description: false,
      help: arr.join('\n'),
    }).showHelp(0);
  }
}

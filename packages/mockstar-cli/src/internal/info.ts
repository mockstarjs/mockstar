import figlet from 'figlet';
import chalk from 'chalk';
import { Base } from './base';
import { MockStar } from '../core';
import { Command } from '../core/command';
import { Argv } from '../types';

export class Info implements Base {
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
    cmd.register('info', 'Display some information about MockStar.', {}, this);
  }

  async call(m: MockStar, args: Argv): Promise<void> {
    //  Font preview：http://patorjk.com/software/taag/#p=display&f=3D-ASCII&t=mockstar%0A
    figlet.text(
      'mockstar',
      {
        font: '3D-ASCII',
        horizontalLayout: 'default',
        verticalLayout: 'default',
      },
      (err, data) => {
        if (err) {
          m.log.info('Something went wrong...');
          m.log.error(err);
          return;
        }

        console.log(chalk.cyan(data as string));
        console.log(
          chalk.cyan(
            ` MockStar，当前版本v${m.version}, 让数据打桩更简单，主页: https://github.com/mockstarjs/mockstar `,
          ),
        );
        console.log(chalk.cyan(' (c) powered by IVWEB Team'));
        console.log(chalk.cyan(' Run mockstar --help to see usage. '));
      },
    );
  }
}

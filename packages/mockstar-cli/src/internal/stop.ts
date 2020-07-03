import {stop} from 'mockstar-starting';
import {Base} from './base';
import {MockStar} from '../core';
import {Command} from '../core/command';
import {Argv} from '../types';
import {info} from '../utils/colorsLog';

export class Stop implements Base {
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
    cmd.register('stop', 'Stop current background service', {}, this);
  }

  async call(m: MockStar, args: Argv): Promise<void> {
    return stop((isPidRunning, config) => {
      if (isPidRunning) {
        info(`[i] MockStar@${m.version} is stop failed!`);
        info('\n' + JSON.stringify(config, null, 2));
      } else {
        info(`[i] MockStar@${m.version} is stopped!`);
      }
    });
  }
}

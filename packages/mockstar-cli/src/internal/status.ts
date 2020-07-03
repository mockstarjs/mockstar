import {getStatus, showRunningStatus} from 'mockstar-starting';
import {Base} from './base';
import {MockStar} from '../core';
import {Command} from '../core/command';
import {Argv} from '../types';
import {info} from '../utils/colorsLog';

export class Status implements Base {
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
    cmd.register('status', 'Show the running status of MockStar', {}, this);
  }

  async call(m: MockStar, args: Argv): Promise<void> {
    return getStatus((isPidRunning, config) => {
      if (isPidRunning) {
        showRunningStatus(m.version, config, true);
      } else {
        info(`[i] MockStar@${m.version} is not running!`);
      }
    });
  }
}

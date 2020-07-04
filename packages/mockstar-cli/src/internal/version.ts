import {Base} from './base';
import {MockStar} from '../core';
import {Command} from '../core/command';
import {Argv} from '../types';

export class Version implements Base {
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
    cmd.register('version', 'Display version information.', {}, this);
  }

  async call(m: MockStar, args: Argv): Promise<void> {
    console.log('mockstar:', m.version);
  }
}

import {MockStar} from '../core';
import {Command} from '../core/command';
import {Argv} from '../types';

export interface Base {
  setInfo(desc: string, options: Record<string, unknown>): void;
  register(cmd: Command): void;
  call(m: MockStar, args: Argv): Promise<void>;
}

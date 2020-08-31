import { MockStar } from '../core';
import { Command } from '../core/command';
import { Argv } from '../types';

/**
 * @member setInfo 设置信息
 * @member register 将具体的命令处理注册到 ctx
 * @member call 对外提供命令调用
 */
export interface Base {
  setInfo(desc: string, options: Record<string, unknown>): void;
  register(cmd: Command): void;
  call(m: MockStar, args: Argv): Promise<void>;
}

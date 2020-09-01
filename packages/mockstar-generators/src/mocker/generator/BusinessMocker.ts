import { InitMockerOpts, MockerConfig } from '../index';

export default class BusinessMocker {
  parentPath: string;
  config: MockerConfig;
  isDev: boolean;
  force: boolean;
  isInitReadme: boolean;
  debugMockModuleJsonData?: Record<string, unknown>;

  constructor(opts: InitMockerOpts) {
    this.parentPath = opts.parentPath;
    this.config = opts.config;
    this.isDev = opts.isDev || false;
    this.force = opts.force || false;
    this.isInitReadme = !!opts.isInitReadme;
    this.debugMockModuleJsonData = opts.debugMockModuleJsonData;
  }
}

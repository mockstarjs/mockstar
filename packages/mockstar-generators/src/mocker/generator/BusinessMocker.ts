export interface BusinessMockerOpts {
  parentPath: string;
  config: MockerConfig;
  isDev?: boolean;
  isInitReadme?: boolean;
  debugMockModuleJsonData?: Record<string, unknown>;
}

interface MockerConfig {
  name: string;
  route: string;
  method: string;
}

export default class BusinessMocker {
  parentPath: string;
  config: MockerConfig;
  isDev: boolean;
  isInitReadme: boolean;
  debugMockModuleJsonData?: Record<string, unknown>;

  constructor(opts: BusinessMockerOpts) {
    this.parentPath = opts.parentPath;
    this.config = opts.config;
    this.isDev = opts.isDev || false;
    this.isInitReadme = !!opts.isInitReadme;
    this.debugMockModuleJsonData = opts.debugMockModuleJsonData;
  }
}

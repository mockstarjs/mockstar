export interface MockerConfigOpts {
  isDev?: boolean;
  parentPath?: string;
  isInitReadme?: boolean;
  config?: Record<string, unknown>;
}

export class MockerConfig {
  isDev: boolean;
  parentPath: string;
  isInitReadme: boolean;
  config: Record<string, unknown>;

  constructor(opts: MockerConfigOpts = {}) {
    this.isDev = opts.isDev || false;
    this.parentPath = opts.parentPath || '';

    this.isInitReadme = !!opts.isInitReadme;

    this.config = opts.config || {};
  }
}

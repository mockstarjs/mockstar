export interface ProjectConfigOpts {
  isDev?: boolean;
  autoInstall?: boolean;
  parentPath?: string;
  pkgVersion?: Record<string, unknown>;
  name?: string;
  port?: number;
  cmder?: string;
}

export class ProjectConfig {
  isDev: boolean;
  autoInstall: boolean;
  parentPath: string;
  pkgVersion: Record<string, unknown>;
  name: string;
  port: number;
  cmder: string;

  constructor(opts: ProjectConfigOpts = {}) {
    this.isDev = opts.isDev || false;
    this.autoInstall = opts.autoInstall || false;
    this.parentPath = opts.parentPath || '';
    this.pkgVersion = opts.pkgVersion || {};

    this.name = opts.name || '';
    this.port = opts.port || 9527;

    this.cmder = opts.cmder || 'npm';
  }
}

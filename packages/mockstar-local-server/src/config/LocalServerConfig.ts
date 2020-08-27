import fs from 'fs';
import { LocalServerConfigOpt } from '../types';
import { getMockServerPath, getBuildPath, getLogPath } from '../utils/mockstar';

export class LocalServerConfig {
  // 根目录
  rootPath: string;
  // 构建之后的目录
  buildPath: string;
  // 日志目录
  logPath: string;
  // mock server 根目录
  mockServerPath: string;
  // mockstar 启动之后的服务端口号，默认为 9527
  port: number;
  // 应用的名字，用于标识一个服务，停止服务或者 pm2 启动的时候来命名
  name: string;
  // 当前是否为开发模式
  isDev: boolean;
  // 是否监听文件变化，推荐本地开发模式下使用
  watch: boolean;
  // 命名空间
  namespace: string;
  // 静态资源的基础路径，例如 /s/ ，或者 /s/t/ ，默认为 /
  staticBasePath: string;
  // 管理后台页面的路由名，实际访问时路径为 yourdomain/{this.namespace}/{this.adminSiteRouteName}
  adminSiteRouteName: string;
  // 管理后台CGI的路由名，实际访问时路径为 yourdomain/{this.namespace}/{this.adminCGIRouteName}
  adminCGIRouteName: string;

  /**
   * 获取最终的配置数据
   *
   * @param {Object} configOpts 配置项
   */
  constructor(configOpts: LocalServerConfigOpt = { rootPath: '' }) {
    this.rootPath = configOpts.rootPath;

    this.buildPath = getBuildPath(this.rootPath, configOpts.buildPath);

    this.logPath = getLogPath(this.rootPath, this.buildPath, configOpts.logPath);

    this.mockServerPath = getMockServerPath(this.rootPath, configOpts.mockServerPath);

    this.port = configOpts.port || 9527;

    this.name = configOpts.name || `mockstar_${this.port}`;

    this.isDev = configOpts.isDev || false;

    this.watch = configOpts.watch || false;

    this.namespace = configOpts.namespace || '';

    this.staticBasePath = configOpts.staticBasePath || '/';

    this.adminSiteRouteName = `mockstar-admin`;

    this.adminCGIRouteName = `mockstar-cgi`;
  }

  isValid() {
    // 根目录一定要存在
    if (!this.rootPath || !fs.existsSync(this.rootPath)) {
      console.error('UNKNOWN rootPath=' + this.rootPath);
      return false;
    }

    // mockServerPath 目录一定要存在
    if (!this.mockServerPath || !fs.existsSync(this.mockServerPath)) {
      console.error('UNKNOWN mockServerPath=' + this.mockServerPath);
      return false;
    }

    return true;
  }

  /**
   * 获得管理后台站点根目录
   *
   * 1. /
   * 2. /xxx/
   *
   * @param {Boolean} [ignoreNamespace] 是否忽略 namespace
   * @return {String}
   */
  getAdminSiteRootPath(ignoreNamespace?: boolean): string {
    return `${!ignoreNamespace && this.namespace ? '/' + this.namespace : ''}/`;
  }

  /**
   * 获得管理后台页面的基础路径
   *
   * 1. /mockstar-admin
   * 2. /xxx/mockstar-admin
   *
   * @param {Boolean} [ignoreNamespace] 是否忽略 namespace
   * @return {String}
   */
  getAdminSiteBase(ignoreNamespace?: boolean): string {
    return `${this.getAdminSiteRootPath(ignoreNamespace)}${this.adminSiteRouteName}`;
  }

  /**
   * 获得管理后台CGI的基础路径
   *
   * 1. /mockstar-cgi
   * 2. /xxx/mockstar-cgi
   *
   * @param {Boolean} [ignoreNamespace] 是否忽略 namespace
   * @return {String}
   */
  getAdminCGIBase(ignoreNamespace?: boolean): string {
    return `${this.getAdminSiteRootPath(ignoreNamespace)}${this.adminCGIRouteName}`;
  }

  /**
   * 获得在 web 页面展示的数据
   * @return {Object}
   */
  getShowDataInWeb():
    | this
    | {
        name: string;
        port: number;
        namespace: string;
        adminSiteRouteName: string;
        adminCGIRouteName: string;
      } {
    // 开发者模式下展示所有的数据
    if (this.isDev) {
      return this;
    }

    // 生产环境下只展示必要的
    return {
      name: this.name,
      port: this.port,
      namespace: this.namespace,
      adminSiteRouteName: this.adminSiteRouteName,
      adminCGIRouteName: this.adminCGIRouteName,
    };
  }
}

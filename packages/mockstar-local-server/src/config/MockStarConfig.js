const fs = require('fs');
const { getMockServerPath, getBuildPath, getLogPath } = require('../utils/mockstar');

class MockStarConfig {
    /**
     * 获取最终的配置数据
     *
     * @param {Object} configOpts mockstar.config.js中的配置项
     * @param {String} [configOpts.rootPath] 项目根目录
     * @param {String} [configOpts.buildPath] 构建之后的目录
     * @param {String} [configOpts.logPath] 日志目录
     * @param {String} [configOpts.mockServerPath]  mock server 根目录
     * @param {Number} [configOpts.port] 端口号
     * @param {String} [configOpts.name] pm2 应用的名字
     * @param {Boolean} [configOpts.isDev] 当前是否为开发模式
     * @param {Boolean} [configOpts.watch] 是否监听文件变化，只有在 pm2 场景下才有效
     * @param {String} [configOpts.namespace] 命名空间
     * @returns {Object}
     */
    constructor(configOpts = {}) {
        // 根目录
        this.rootPath = configOpts.rootPath;

        // 构建之后的目录
        this.buildPath = getBuildPath(this.rootPath, configOpts.buildPath);

        // 日志目录
        this.logPath = getLogPath(this.rootPath, this.buildPath, configOpts.logPath);

        // mock server 根目录
        this.mockServerPath = getMockServerPath(this.rootPath, configOpts.mockServerPath);

        // mockstar 启动之后的服务端口号，默认为 9527
        this.port = this.port || 9527;

        // pm2 应用的名字
        this.name = this.name || `mockstar_${this.port}`;

        // 当前是否为开发模式
        this.isDev = this.isDev || false;

        // 是否监听文件变化，只有在 pm2 场景下才有效
        this.watch = this.watch || false;

        // 命名空间
        this.namespace = this.namespace || '';

        // 管理后台访问的根目录
        this.adminBasePath = this.adminBasePath || `${this.namespace ? '/' + this.namespace : ''}/mockstar-admin`;
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
}

module.exports = MockStarConfig;
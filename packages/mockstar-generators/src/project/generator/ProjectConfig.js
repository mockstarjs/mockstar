module.exports = class ProjectConfig {
    constructor(opts) {
        this.isDev = opts.isDev || false;
        this.autoInstall = opts.autoInstall || false;
        this.parentPath = opts.parentPath || '';
        this.pkgVersion = opts.pkgVersion || {};

        this.name = opts.name || '';
        this.port = opts.port || 9527;
    }
};

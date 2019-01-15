module.exports = class MockerConfig {
    constructor(opts = {}) {
        this.isDev = opts.isDev || false;
        this.parentPath = opts.parentPath || '';

        this.isInitReadme = !!opts.isInitReadme;

        this.config = opts.config || {};
    }
};
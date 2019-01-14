module.exports = class MockerConfig {
    constructor(opts = {}) {
        this.isDev = opts.isDev || false;
        this.parentPath = opts.parentPath || '';

        this.config = opts.config || {};
    }
};
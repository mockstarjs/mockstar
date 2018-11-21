module.exports = class MockerConfig {
    constructor() {
        this.mockerParentPath = '';
        this.mockerName = '';
    }

    updateByAnswer(opts) {
        this.mockerParentPath = opts.mockerParentPath;
        this.mockerName = opts.mockerName;
    }
};
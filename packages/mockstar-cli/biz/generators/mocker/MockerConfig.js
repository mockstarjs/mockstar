const urlParse = require('url-parse');

module.exports = class MockerConfig {
    constructor(opts = {}) {
        this.mockerParentPath = opts.mockerParentPath || '';
        this.mockerName = opts.mockerName || '';
        this.method = opts.method || 'get';

        this.route = opts.route || '';
        this.host = '';
    }

    updateByAnswer(opts = {}) {
        this.mockerParentPath = opts.mockerParentPath;
        this.mockerName = opts.mockerName;
        this.method = opts.method;

        const urlParseResult = urlParse(opts.reqURL);

        this.route = urlParseResult.pathname;
        this.host = urlParseResult.host;
    }
};

// console.log(urlParse('http://now.qq.com/index.html?a=111'))
// console.log(urlParse('/cgi-bin/index.html?a=111'))
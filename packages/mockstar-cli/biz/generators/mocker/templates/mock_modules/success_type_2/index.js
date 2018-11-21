const { getSuccessData } = require('../../base');

module.exports = function () {
    return getSuccessData({
        uid: 22222,
        type: 2,
        description: '老师'
    });
};
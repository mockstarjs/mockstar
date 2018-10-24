const { getSuccessData } = require('../../base');

module.exports = function (params) {
    return getSuccessData({
        uid: params.uid || 11111,
        type: 1,
        description: '学生'
    });
};
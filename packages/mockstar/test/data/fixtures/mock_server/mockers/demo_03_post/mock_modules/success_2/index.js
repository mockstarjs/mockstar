const { getSuccess } = require('../../base');

function getResult(params) {
    return getSuccess({
        result: params && params.a ? ('from_param_' + params.a) : 2
    });
}

module.exports = getResult;
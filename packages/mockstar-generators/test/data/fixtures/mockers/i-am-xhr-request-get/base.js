/**
 * 默认值
 * @type {Object}
 */
const defaultData = {
  uid: 0,
  type: 0,
  description: '',
  other_msg: '初始信息',
};

/**
 * 获得CGI成功时返回的信息
 *
 * @param {Object | Promise} data CGI实际的数据
 * @returns {Promise}
 */
function getSuccessData(data) {
  return Promise.resolve(data).then(resultData => ({
    retcode: 0,
    result: Object.assign({}, defaultData, resultData),
  }));
}

/**
 * 获得CGI异常和失败时返回的信息
 *
 * @param {Number | Promise} errCode 错误码
 * @param {String} [errMsg] 错误信息
 * @returns {Promise}
 */
function getErrorData(errCode, errMsg) {
  return Promise.resolve(errCode).then((resultCode) => {
    const obj = {
      retcode: resultCode,
    };

    if (errMsg) {
      obj.err_msg = errMsg;
    }

    return obj;
  });
}

module.exports = {
  getSuccessData,
  getErrorData,
};

/**
 * [TODO: 说明]
 *
 * @param {Object} params 请求参数的对象，例如 ?a=1&b=2 ，则 params={a:1,b:2}
 * @param {Object} req 详见 http://expressjs.com/en/4x/api.html#req
 * @return {Promise|*}
 */
module.exports = function (params, req) {
  return {
  "retcode": 0,
  "result": {
    "uid": 99999,
    "type": 9,
    "description": "我是 debug",
    "other_msg": "仅作为临时调试用，建议按照不同的场景构造不同的 mock module!"
  }
};
};

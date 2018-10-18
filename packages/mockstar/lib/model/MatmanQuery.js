'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = require('../config'),
    MATMAN_QUERY_KEY = _require.MATMAN_QUERY_KEY;

var MatmanQueryItem = require('./MatmanQueryItem');

var MatmanQuery = function () {
  /**
   * 构造函数
   */
  function MatmanQuery() {
    _classCallCheck(this, MatmanQuery);

    this.list = [];
  }

  /**
   * 增加一个元素
   *
   * @param {Object | String} mockerName mocker 的名字
   * @param {String} mockModuleName mock module 的名字
   * @param {Boolean} shouldDisableMatman 是否禁用 mocker 服务
   */


  _createClass(MatmanQuery, [{
    key: 'addOne',
    value: function addOne(mockerName, mockModuleName, shouldDisableMatman) {
      // TODO 也许这里应该要加一个去重判断
      this.list.push(new MatmanQueryItem(mockerName, mockModuleName, shouldDisableMatman));
    }

    /**
     * 获取附加到 url 上的 query string
     *
     * @returns {String}
     */

  }, {
    key: 'getQueryString',
    value: function getQueryString() {
      return MATMAN_QUERY_KEY + '=' + JSON.stringify(this.list);
    }
  }]);

  return MatmanQuery;
}();

module.exports = MatmanQuery;
//# sourceMappingURL=MatmanQuery.js.map
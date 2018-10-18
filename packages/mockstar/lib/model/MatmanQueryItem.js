'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var gConfig = require('../config');

var MatmanQueryItem = function () {
  /**
   * 构造函数
   *
   * @param {Object | String} mockerName mocker 的名字，或者是对象
   * @param {String} [mockModuleName] mock module 的名字
   * @param {Boolean} [shouldDisableMatman] 是否禁用 mocker 服务
   */
  function MatmanQueryItem(mockerName, mockModuleName, shouldDisableMatman) {
    _classCallCheck(this, MatmanQueryItem);

    if (mockerName && (typeof mockerName === 'undefined' ? 'undefined' : _typeof(mockerName)) === 'object') {
      // 如果传入的是对象，则假设这个对象是符合 MatmanQueryItem 字段定义的对象
      this._m_name = mockerName._m_name;
      this[gConfig.TARGET_FIELD] = mockerName[gConfig.TARGET_FIELD];
      this._m_disable = mockerName._m_disable;
    } else {
      // 如果传递的是普通的参数，则依次设置
      this._m_name = mockerName;
      this[gConfig.TARGET_FIELD] = mockModuleName;
      this._m_disable = shouldDisableMatman ? 1 : 0;
    }
  }

  /**
   * 是否为 disable 状态
   *
   * @returns {Boolean}
   */


  _createClass(MatmanQueryItem, [{
    key: 'isDisabled',
    value: function isDisabled() {
      return !!this._m_disable;
    }

    /**
     * 通过名字查询是否为当前的 MatmanQueryItem 项
     *
     * @param {String} name 数据模块名字
     * @returns {Boolean}
     */

  }, {
    key: 'isMe',
    value: function isMe(name) {
      return this._m_name === name;
    }
  }]);

  return MatmanQueryItem;
}();

module.exports = MatmanQueryItem;
//# sourceMappingURL=MatmanQueryItem.js.map
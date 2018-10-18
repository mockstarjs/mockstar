'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var fsHandler = require('fs-handler');

var MockerConfig = require('./MockerConfig');
var MockModule = require('./MockModule');

/**
 * 案例
 */

var Case = function () {
  /**
   * 构造函数
   *
   * @param {String} basePath case 的绝对路径
   */
  function Case(basePath) {
    _classCallCheck(this, Case);

    this.basePath = basePath;

    // config.json 的内容
    var config = require(path.join(this.basePath, './config'));

    // 优先使用 config.name，其次是模块的文件夹名
    this.name = config.name || path.basename(this.basePath);

    // 案例名字
    this.name = '';

    // 案例简要描述
    this.description = '';

    // 案例中包含哪些 mocker 和这个 mocker 的 activeModule
    this.list = [];

    // 案例 readme
  }

  _createClass(Case, [{
    key: 'updateConfig',
    value: function updateConfig(opts) {
      this.config = _.merge({}, this.config, opts);
    }
  }]);

  return Case;
}();

module.exports = Case;

// function getCheckPic() {
//   let matmanQuery = new MatmanQuery();
//
//   matmanQuery.addOne('get_short_video', 'success_type_2', false);
//
//   matmanQuery.addOne('get_balance', 'success_16888', false);
//   matmanQuery.addOne('get_gift_list', 'success_basic', false);
//   matmanQuery.addOne('follow-anchor', 'success', false);
//   matmanQuery.addOne('get_verify_status', 'success_all_ok', false);
//   matmanQuery.addOne('exchange_gift', 'success', false);
//
//   return matmanQuery;
// }
//# sourceMappingURL=Case.js.map
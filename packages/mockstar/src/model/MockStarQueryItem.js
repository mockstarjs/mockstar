import { MS_TARGET } from '../config';

export default class MockStarQueryItem {
  /**
   * 构造函数
   *
   * @param {Object | String} mockerName mocker 的名字，或者是对象
   * @param {String} [mockModuleName] mock module 的名字
   * @param {Boolean} [shouldDisableMatman] 是否禁用 mocker 服务
   */
  constructor(mockerName, mockModuleName, shouldDisableMatman) {
    if (mockerName && (typeof mockerName === 'object')) {
      // 如果传入的是对象，则假设这个对象是符合 MatmanQueryItem 字段定义的对象
      this._ms_name = mockerName._ms_name;
      this[MS_TARGET] = mockerName[MS_TARGET];
      this._ms_disable = mockerName._ms_disable;
    } else {
      // 如果传递的是普通的参数，则依次设置
      this._ms_name = mockerName;
      this[MS_TARGET] = mockModuleName;
      this._ms_disable = shouldDisableMatman ? 1 : 0;
    }
  }

  /**
   * 是否为 disable 状态
   *
   * @returns {Boolean}
   */
  isDisabled() {
    return !!this._ms_disable;
  }

  /**
   * 通过名字查询是否为当前的 MatmanQueryItem 项
   *
   * @param {String} name 数据模块名字
   * @returns {Boolean}
   */
  isMe(name) {
    return this._ms_name === name;
  }
}
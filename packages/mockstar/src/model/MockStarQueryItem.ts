/**
 * 当传入为对象时的数据类型
 */
interface MockerName {
  _ms_name: string;
  _ms_target: string;
  _ms_disable: boolean;
  _ms_extra?: any;
}

export default class MockStarQueryItem {
  _ms_name: string;
  _ms_target: string;
  _ms_disable: boolean;
  _ms_extra: any;

  /**
   * 构造函数
   *
   * @param {Object | String} mockerName mocker 的名字，或者是对象
   * @param {String} [mockModuleName] mock module 的名字
   * @param {Boolean} [shouldDisable] 是否禁用 mocker 服务
   * @param {*} [extra] 额外信息
   */
  constructor(mockerName: MockerName);
  constructor(
    mockerName: string | MockerName,
    mockModuleName: string,
    shouldDisable?: boolean,
    extra?: any,
  );
  constructor(
    mockerName: string | MockerName,
    mockModuleName?: string,
    shouldDisable?: boolean,
    extra?: any,
  ) {
    if (mockerName && typeof mockerName === 'object') {
      // 如果传入的是对象，则假设这个对象是符合 MockStarQueryItem 字段定义的对象
      this._ms_name = mockerName._ms_name;
      this._ms_target = mockerName._ms_target;
      this._ms_disable = !!mockerName._ms_disable;
      this._ms_extra = mockerName._ms_extra;
    } else {
      // 如果传递的是普通的参数，则依次设置
      this._ms_name = mockerName;
      this._ms_target = mockModuleName ? mockModuleName : '';
      this._ms_disable = !!shouldDisable;
      this._ms_extra = extra;
    }
  }

  /**
   * 是否为 disable 状态
   *
   * @returns {Boolean}
   */
  isDisabled(): boolean {
    return !!this._ms_disable;
  }

  /**
   * 通过mocker名字查询是否为当前的 MockStarQueryItem 项
   *
   * @param {String} name mocker的名字
   * @returns {Boolean}
   */
  isMe(name: string): boolean {
    return this._ms_name === name;
  }
}

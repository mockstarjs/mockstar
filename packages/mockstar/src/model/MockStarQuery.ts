import MockStarQueryItem from './MockStarQueryItem';
import {MS_QUERY_KEY} from '../config';

export default class MockStarQuery {
  list: MockStarQueryItem[];
  /**
   * 构造函数
   */
  constructor() {
    this.list = [];
  }

  /**
   * 增加一个元素
   *
   * @param {Object | String} mockerName mocker 的名字
   * @param {String} mockModuleName mock module 的名字
   * @param {Boolean} [shouldDisable] 是否禁用 mocker 服务
   * @param {*} [extra] 额外信息
   */
  addOne(mockerName: string, mockModuleName: string, shouldDisable?: boolean, extra?: any): void {
    // TODO 也许这里应该要加一个去重判断
    this.list.push(new MockStarQueryItem(mockerName, mockModuleName, shouldDisable, extra));
  }

  /**
   * 获取字符串数据
   *
   * @returns {String}
   */
  getString(): string {
    return JSON.stringify(this.list);
  }

  /**
   * 获取附加到 url 上的 query string
   *
   * @returns {String}
   */
  getQueryString(): string {
    return MS_QUERY_KEY + '=' + encodeURIComponent(this.getString());
  }

  /**
   * 获取附加到cookie中的信息
   *
   * @returns {String}
   */
  getCookieString(): string {
    return MS_QUERY_KEY + '=' + this.getString();
  }

  /**
   * 追加 query 参数到 url 上
   * @param {String} url 目标链接地址
   * @return {String} 新的链接地址
   */
  appendToUrl(url: string): string {
    if (!url) {
      return url;
    }

    return url + (url.indexOf('?') > -1 ? '&' : '?') + this.getQueryString();
  }
}

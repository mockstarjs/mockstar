import MockStarQueryItem from './MockStarQueryItem';

/**
 * 在 url 中携带的 query 值，例如 /path/to/url?_ms_=xxx
 *
 * @type {String}
 */
export const MS_QUERY_KEY = '_ms_';

export default class MockStarQuery {
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
     * @param {Boolean} shouldDisableMatman 是否禁用 mocker 服务
     */
    addOne(mockerName, mockModuleName, shouldDisableMatman) {
        // TODO 也许这里应该要加一个去重判断
        this.list.push(new MockStarQueryItem(mockerName, mockModuleName, shouldDisableMatman));
    }

    /**
     * 获取附加到 url 上的 query string
     *
     * @returns {String}
     */
    getQueryString() {
        return MS_QUERY_KEY + '=' + JSON.stringify(this.list);
    };
}

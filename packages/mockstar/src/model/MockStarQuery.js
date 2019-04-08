import MockStarQueryItem from './MockStarQueryItem';
import { MS_QUERY_KEY } from '../config';

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
     * @param {Boolean} shouldDisable 是否禁用 mocker 服务
     * @param {*} [extra] 额外信息
     */
    addOne(mockerName, mockModuleName, shouldDisable, extra) {
        // TODO 也许这里应该要加一个去重判断
        this.list.push(new MockStarQueryItem(mockerName, mockModuleName, shouldDisable, extra));
    }

    /**
     * 获取附加到 url 上的 query string
     *
     * @returns {String}
     */
    getQueryString() {
        return MS_QUERY_KEY + '=' + encodeURIComponent(JSON.stringify(this.list));
    };
}

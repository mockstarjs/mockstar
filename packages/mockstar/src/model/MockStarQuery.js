import MockStarQueryItem from './MockStarQueryItem';
import { MS_QUERY_KEY } from '../config';

export default class MockStarQuery {
    /**
     * 构造函数
     * @param {Object} mockerMap mocker的配置表用于快速指定桩数据，key 为 mockerName，value 为 mockModuleName
     */
    constructor(mockerMap = {}) {
        this.list = [];

        this._init(mockerMap);
    }

    /**
     * 增加一个元素
     *
     * @param {Object | String} mockerName mocker 的名字
     * @param {String} mockModuleName mock module 的名字
     * @param {Boolean} [shouldDisable] 是否禁用 mocker 服务
     * @param {*} [extra] 额外信息
     */
    addOne(mockerName, mockModuleName, shouldDisable, extra) {
        // TODO 也许这里应该要加一个去重判断
        this.list.push(new MockStarQueryItem(mockerName, mockModuleName, shouldDisable, extra));
    }

    /**
     * 获取字符串数据
     *
     * @returns {String}
     */
    getString() {
        return JSON.stringify(this.list);
    };

    /**
     * 获取附加到 url 上的 query string
     *
     * @returns {String}
     */
    getQueryString() {
        return MS_QUERY_KEY + '=' + this.getString();
    };

    /**
     * 获取附加到cookie中的信息
     *
     * @returns {String}
     */
    getCookieString() {
        return MS_QUERY_KEY + '=' + this.getString();
    };

    _init(mockerMap) {
        if (!mockerMap || typeof mockerMap !== 'object') {
            return;
        }

        // 获得 mockerName 列表
        const mockerNameList = Object.keys(mockerMap);

        // 加入到列表中
        mockerNameList.forEach((mockerName) => {
            this.addOne(mockerName, mockerMap[mockerName], false);
        });
    }
}

import urlHandle from 'url-handle';

import MockStarQuery from './model/MockStarQuery';
import MockStarQueryItem from './model/MockStarQueryItem';
import { MS_QUERY_KEY } from './config';

/**
 * 创建 MockStarQuery
 *
 * @param {Object} [queryMap] 键值对，key值为 mockerName, value值为 mockModuleName
 * @return {MockStarQuery}
 */
export function createMockStarQuery(queryMap) {
    const mockStarQuery = new MockStarQuery();

    // 自动设置
    if (queryMap && typeof queryMap === 'object') {
        Object.keys(queryMap).forEach((mockerName) => {
            mockStarQuery.addOne(mockerName, queryMap[mockerName], false);
        });
    }

    return mockStarQuery;
}

/**
 * 从cookie或referer中获得指定名字的携带的特定桩信息
 *
 * @param {String} name 指定的 mocker 名字
 * @param {Object} opts 参数
 * @param {String} opts.referer req.headers.referer
 * @param {Object} opts.cookies cookie对象
 * @returns {Item | null}
 */
export function getQueryItem(name, opts = {}) {
    let queryItemsFromCookie = getQueryItemsFromCookieMap(opts.cookies);
    let queryItemsFromReferer = getQueryItemsFromReferer(opts.referer);

    let result = null;
    let list = [].concat(queryItemsFromCookie, queryItemsFromReferer);

    // 判断该路由的名字是否在referer中
    for (let i = 0, length = list.length; i < length; i++) {
        let mockStarQueryItem = new MockStarQueryItem(list[i]);
        if (mockStarQueryItem.isMe(name)) {
            result = mockStarQueryItem;
            break;
        }
    }

    return result;
}

/**
 * 获得 req.headers.referer 中携带的额外参数列表
 *
 * @param {String} referer req.headers.referer
 * @returns {{_ms_name:String,_ms_target:String,_ms_disable:Number}[]} 结果
 */
export function getQueryItemsFromReferer(referer) {
    let paramsFromReferer;

    try {
        paramsFromReferer = JSON.parse(urlHandle.query(MS_QUERY_KEY, referer)) || [];

        // 初步校验一下是否为数组即可
        if (!Array.isArray(paramsFromReferer)) {
            paramsFromReferer = [];
        }

    } catch (e) {
        paramsFromReferer = [];
    }

    return paramsFromReferer;
}

/**
 * 获得 req.headers.cookie 中携带的额外参数列表
 *
 * @param {Object} cookies cookie对象
 * @returns {{_ms_name:String,_ms_target:String,_ms_disable:Number}[]} 结果
 */
export function getQueryItemsFromCookieMap(cookies) {
    let paramsFromCookie;

    try {
        paramsFromCookie = JSON.parse(cookies[MS_QUERY_KEY]) || [];

        // 初步校验一下是否为数组即可
        if (!Array.isArray(paramsFromCookie)) {
            paramsFromCookie = [];
        }

    } catch (e) {
        paramsFromCookie = [];
    }

    return paramsFromCookie;
}
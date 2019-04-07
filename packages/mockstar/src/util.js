import urlHandle from 'url-handle';

import MockStarQueryItem from './model/MockStarQueryItem';
import { MS_QUERY_KEY } from './model/MockStarQuery';

/**
 * 从cookie或referer中获得指定名字的携带的特定桩信息
 *
 * @param {String} name 指定的 mocker 名字
 * @param {Object} opts 参数
 * @param {String} opts.referer req.headers.referer
 * @param {Object} opts.cookies cookie对象
 * @returns {Item | null}
 */
export function getQueryItem(name, opts) {
    let queryItemsFromReferer = getQueryItemsFromReferer(opts.referer);
    let queryItemsFromCookie = getQueryItemsFromCookie(opts.cookies);

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
function getQueryItemsFromReferer(referer) {
    let paramsFromReferer;

    try {
        paramsFromReferer = JSON.parse(urlHandle.query(MS_QUERY_KEY, referer)) || [];
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
function getQueryItemsFromCookie(cookies) {
    let paramsFromCookie;

    try {
        paramsFromCookie = JSON.parse(cookies[MS_QUERY_KEY]) || [];
    } catch (e) {
        paramsFromCookie = [];
    }

    return paramsFromCookie;
}
import urlHandle from 'url-handle';

import MockStarQueryItem from './model/MockStarQueryItem';
import { MS_QUERY_KEY } from './model/MockStarQuery';

/**
 * 获得 req.headers.referer 中指定名字的携带的特定桩信息
 *
 * @param {String} referer req.headers.referer
 * @param {String} name 指定的 mocker 名字
 * @returns {Item | null}
 */
export function getQueryItem(referer, name) {
    let queryItemsFromReferer = getQueryItemsFromReferer(referer);

    let result = null;

    // 判断该路由的名字是否在referer中
    for (let i = 0, length = queryItemsFromReferer.length; i < length; i++) {
        let matmanQueryItem = new MockStarQueryItem(queryItemsFromReferer[i]);
        if (matmanQueryItem.isMe(name)) {
            result = matmanQueryItem;
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
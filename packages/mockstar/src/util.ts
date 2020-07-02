// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import urlHandle from 'url-handle';
import MockStarQuery from './model/MockStarQuery';
import MockStarQueryItem from './model/MockStarQueryItem';
import {MS_QUERY_KEY} from './config';

interface GetQueryItemOpt {
  cookies?: Record<string, any>;
  mockstarQueryString?: string | string[];
  referer?: string;
}

/**
 * 创建 MockStarQuery
 *
 * @param {Object} [queryMap] 键值对，key值为 mockerName, value值为 mockModuleName
 * @return {MockStarQuery}
 */
export function createMockStarQuery(queryMap: Record<string, string>): MockStarQuery {
  const mockStarQuery = new MockStarQuery();

  // 自动设置
  if (queryMap && typeof queryMap === 'object') {
    Object.keys(queryMap).forEach(mockerName => {
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
 * @param {String} opts.mockstarQueryString
 * @param {Object} opts.cookies cookie对象
 * @returns {Item | null}
 */
export function getQueryItem(name: string, opts: GetQueryItemOpt = {}) {
  const queryItemsFromCookie = getQueryItemsFromCookieMap(opts.cookies);
  const queryItemsFromHeaders = getQueryItemsFromQueryString(opts.mockstarQueryString as string);
  const queryItemsFromReferer = getQueryItemsFromReferer(opts.referer);

  let result: any = null;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const list = [].concat(queryItemsFromCookie, queryItemsFromHeaders, queryItemsFromReferer);

  // 判断该路由的名字是否在referer中
  for (let i = 0, length = list.length; i < length; i++) {
    const mockStarQueryItem = new MockStarQueryItem(list[i]);
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
export function getQueryItemsFromReferer(referer: string | undefined): any[] {
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
export function getQueryItemsFromCookieMap(
  cookies: Record<string, any> | undefined,
): Record<string, unknown>[] {
  let paramsFromCookie;

  try {
    paramsFromCookie = JSON.parse((cookies as any)[MS_QUERY_KEY]) || [];
    // 初步校验一下是否为数组即可
    if (!Array.isArray(paramsFromCookie)) {
      paramsFromCookie = [];
    }
  } catch (e) {
    paramsFromCookie = [];
  }

  return paramsFromCookie;
}

/**
 * 从字符串解析获得对象队列
 *
 * @param {String} mockstarQueryString
 * @returns {{_ms_name:String,_ms_target:String,_ms_disable:Number}[]} 结果
 */
export function getQueryItemsFromQueryString(
  mockstarQueryString: string | undefined,
): {_ms_name: string; _ms_target: string; _ms_disable: number}[] {
  let paramsFromCookie;

  try {
    paramsFromCookie = JSON.parse(decodeURIComponent(mockstarQueryString as string)) || [];

    // 初步校验一下是否为数组即可
    if (!Array.isArray(paramsFromCookie)) {
      paramsFromCookie = [];
    }
  } catch (e) {
    paramsFromCookie = [];
  }

  return paramsFromCookie;
}

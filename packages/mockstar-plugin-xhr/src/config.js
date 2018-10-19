/**
 * 在 url 中携带的 query 值，例如 /path/to/url?_ms_=xxx
 *
 * @type {String}
 */
export const XHR_QUERY_KEY = '_ms_';

/**
 * mock数据时，如果请求中携带了该属性，则优先返回该属性对应的数据模块值，此时将忽略 activeModule 的数据模块
 *
 * @type {String}
 */
export const XHR_TARGET = '_ms_target_';


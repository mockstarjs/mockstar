/**
 * 在 referer 中携带的 query 值，或者 cookie 中携带的值，用于指定获取哪些桩数据
 * 例如： /path/to/url?_ms_=xxx，或者 cookie 中的 '_ms_=xxx;'
 *
 * @type {String}
 */
export const MS_QUERY_KEY = '_ms_';

/**
 * 桩对象模块（mocker）用于标记唯一性的字段名字
 *
 * @type {String}
 */
export const MS_NAME = '_ms_name';

/**
 * 桩数据模块（mockModule）用于标记唯一性的字段名字
 * 例如在请求中有 _ms_target=xyz，则将返回名字为 xyz 的 mockModule
 *
 * @type {String}
 */
export const MS_TARGET = '_ms_target';

/**
 * 用于指定桩数据是否启用的字段名
 * 例如在请求中有 _ms_disable=1，则不再使用模拟数据
 *
 * @type {String}
 */
export const MS_DISABLE = '_ms_disable';

/**
 * 用于传递额外的参数
 *
 * @type {String}
 */
export const MS_EXTRA = '_ms_extra';

/**
 * 请求来源，标记来自哪的请求
 *
 * @type {String}
 */
export const MS_FROM = '_ms_from';

/**
 * mock_modules 的字段名字
 *
 * @type {String}
 */
export const MOCK_MODULES = 'mock_modules';

/**
 * 缓存在本地的文件
 *
 * @type {String}
 */
export const LOCAL_STORE_FILE = 'db.json';



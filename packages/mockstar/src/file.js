/**
 * 加载模块
 *
 * @param {String} moduleId 模块，绝对路径
 * @param {Boolean} [ignoreCache] 是否忽略缓存
 * @return {*}
 */
export function requireModule(moduleId, ignoreCache) {
    if (typeof moduleId !== 'string') {
        throw new TypeError('Expected a string');
    }

    const filePath = require.resolve(moduleId);
    ignoreCache = true;
    // 忽略缓存
    if (ignoreCache) {
        // Delete itself from module parent
        if (require.cache[filePath] && require.cache[filePath].parent) {
            let i = require.cache[filePath].parent.children.length;

            while (i--) {
                if (require.cache[filePath].parent.children[i].id === filePath) {
                    require.cache[filePath].parent.children.splice(i, 1);
                }
            }
        }

        // Delete module from cache
        delete require.cache[filePath];
    }

    // Return fresh module
    return require(filePath);
}

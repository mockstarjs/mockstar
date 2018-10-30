/**
 * 获得 mockstar admin 的配置等信息
 * @param router
 * @param adminCGIPath
 * @param callback
 */
function initGetAdminDetail(router, adminCGIPath, callback) {
    router.get(`${adminCGIPath}/detail`, callback);
}

/**
 * 获得所有的 handler 列表
 * @param router
 * @param adminCGIPath
 * @param pluginName
 * @param callback
 */
function initGetList(router, adminCGIPath, pluginName, callback) {
    router.get(`${adminCGIPath}/${pluginName}`, callback);
}

/**
 * 获得指定的 handler 信息
 * @param router
 * @param adminCGIPath
 * @param pluginName
 * @param handlerNameField
 * @param callback
 */
function initGetOne(router, adminCGIPath, pluginName, handlerNameField, callback) {
    router.get(`${adminCGIPath}/${pluginName}/:${handlerNameField}`, callback);
}

/**
 * 更新指定的 handler 信息
 * @param router
 * @param adminCGIPath
 * @param pluginName
 * @param handlerNameField
 * @param callback
 */
function initPostOne(router, adminCGIPath, pluginName, handlerNameField, callback) {
    router.post(`${adminCGIPath}/${pluginName}/:${handlerNameField}`, callback);
}

/**
 * 获得指定的 handler 的 readme 信息
 * @param router
 * @param adminCGIPath
 * @param pluginName
 * @param handlerNameField
 * @param callback
 */
function initGetOneReadMe(router, adminCGIPath, pluginName, handlerNameField, callback) {
    router.get(`${adminCGIPath}/${pluginName}/:${handlerNameField}/readme`, callback);
}

module.exports = {
    initGetAdminDetail: initGetAdminDetail,
    initGetList: initGetList,
    initGetOne: initGetOne,
    initPostOne: initPostOne,
    initGetOneReadMe: initGetOneReadMe
};

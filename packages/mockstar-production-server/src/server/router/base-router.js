/**
 * 获得 mockstar admin 的配置等信息
 * @param router
 * @param adminCGIBase
 * @param callback
 */
function initGetAdminDetail(router, adminCGIBase, callback) {
    router.get(`${adminCGIBase}/detail`, callback);
}

/**
 * 获得所有的 handler 列表
 * @param router
 * @param adminCGIBase
 * @param pluginName
 * @param callback
 */
function initGetList(router, adminCGIBase, pluginName, callback) {
    router.get(`${adminCGIBase}/${pluginName}`, callback);
}

/**
 * 获得namespace下所有的 handler 列表
 * @param router
 * @param adminCGIBase
 * @param pluginName
 * @param callback
 */
function initGetNamespaceList(router, adminCGIBase, pluginName, callback) {
    router.get(`${adminCGIBase}/${pluginName}/:namespace`, callback);
}

/**
 * 获得指定的 handler 信息
 * @param router
 * @param adminCGIBase
 * @param pluginName
 * @param handlerNameField
 * @param callback
 */
function initGetOne(router, adminCGIBase, pluginName, handlerNameField, callback) {
    router.get(`${adminCGIBase}/${pluginName}/:${handlerNameField}`, callback);
}



/**
 * 获得指定的 handler 信息
 * @param router
 * @param adminCGIBase
 * @param pluginName
 * @param handlerNameField
 * @param callback
 */
function initGetNamespaceOne(router, adminCGIBase, pluginName, handlerNameField, callback) {
    router.get(`${adminCGIBase}/${pluginName}/:namespace/:${handlerNameField}`, callback);
}

/**
 * 更新指定的 handler 信息
 * @param router
 * @param adminCGIBase
 * @param pluginName
 * @param handlerNameField
 * @param callback
 */
function initPostOne(router, adminCGIBase, pluginName, handlerNameField, callback) {
    router.post(`${adminCGIBase}/${pluginName}/:${handlerNameField}`, callback);
}

/**
 * 更新指定的 handler 信息
 * @param router
 * @param adminCGIBase
 * @param pluginName
 * @param handlerNameField
 * @param callback
 */
function addMocker(router, adminCGIBase, callback) {
    router.post(`${adminCGIBase}/addMocker`, callback);
}

/**
 * 更新指定的 handler 信息
 * @param router
 * @param adminCGIBase
 * @param pluginName
 * @param handlerNameField
 * @param callback
 */
function initPostNamespaceOne(router, adminCGIBase, pluginName, handlerNameField, callback) {
    router.post(`${adminCGIBase}/${pluginName}/:namespace/:${handlerNameField}`, callback);
}

/**
 * 获得指定的 handler 的 readme 信息
 * @param router
 * @param adminCGIBase
 * @param pluginName
 * @param handlerNameField
 * @param callback
 */
function initGetOneReadMe(router, adminCGIBase, pluginName, handlerNameField, callback) {
    router.get(`${adminCGIBase}/${pluginName}/:${handlerNameField}/readme`, callback);
}

/**
 * 获得指定的 handler 的 readme 信息
 * @param router
 * @param adminCGIBase
 * @param pluginName
 * @param handlerNameField
 * @param callback
 */
function initGetNamespaceOneReadMe(router, adminCGIBase, pluginName, handlerNameField, callback) {
    router.get(`${adminCGIBase}/${pluginName}/:namespace/:${handlerNameField}/readme`, callback);
}

module.exports = {
    initGetAdminDetail: initGetAdminDetail,
    initGetList: initGetList,
    initGetOne: initGetOne,
    initPostOne: initPostOne,
    initGetOneReadMe: initGetOneReadMe,
    initGetNamespaceList: initGetNamespaceList,
    initGetNamespaceOne: initGetNamespaceOne,
    initPostNamespaceOne: initPostNamespaceOne,
    initGetNamespaceOneReadMe: initGetNamespaceOneReadMe,
    addMocker: addMocker,
};

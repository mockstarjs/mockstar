import express from 'express';

/**
 * 获得 mockstar admin 的配置等信息
 * @param router
 * @param adminCGIBase
 * @param callback
 */
export function initGetAdminDetail(
  router: express.Router,
  adminCGIBase: string,
  callback: express.RequestHandler,
) {
  router.get(`${adminCGIBase}/detail`, callback);
}

/**
 * 获得所有的 handler 列表
 * @param router
 * @param adminCGIBase
 * @param pluginName
 * @param callback
 */
export function initGetList(
  router: express.Router,
  adminCGIBase: string,
  pluginName: string,
  callback: express.RequestHandler,
) {
  router.get(`${adminCGIBase}/${pluginName}`, callback);
}

/**
 * 获得指定的 handler 信息
 * @param router
 * @param adminCGIBase
 * @param pluginName
 * @param handlerNameField
 * @param callback
 */
export function initGetOne(
  router: express.Router,
  adminCGIBase: string,
  pluginName: string,
  handlerNameField: string,
  callback: express.RequestHandler,
) {
  router.get(`${adminCGIBase}/${pluginName}/:${handlerNameField}`, callback);
}

/**
 * 更新指定的 handler 信息
 * @param router
 * @param adminCGIBase
 * @param pluginName
 * @param handlerNameField
 * @param callback
 */
export function initPostOne(
  router: express.Router,
  adminCGIBase: string,
  pluginName: string,
  handlerNameField: string,
  callback: express.RequestHandler,
) {
  router.post(`${adminCGIBase}/${pluginName}/:${handlerNameField}`, callback);
}

/**
 * 获得指定的 handler 的 readme 信息
 * @param router
 * @param adminCGIBase
 * @param pluginName
 * @param handlerNameField
 * @param callback
 */
export function initGetOneReadMe(
  router: express.Router,
  adminCGIBase: string,
  pluginName: string,
  handlerNameField: string,
  callback: express.RequestHandler,
) {
  router.get(`${adminCGIBase}/${pluginName}/:${handlerNameField}/readme`, callback);
}

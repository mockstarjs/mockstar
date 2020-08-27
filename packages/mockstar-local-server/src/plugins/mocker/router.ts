import { Parser, pkgInfo } from 'mockstar';
import handleXhr from './xhr';
import { Router } from '../../types';
import {
  initGetAdminDetail,
  initGetList,
  initGetOne,
  initGetOneReadMe,
  initPostOne,
} from '../../server/router/base-router';
import { LocalServerConfig } from '../../config/LocalServerConfig';

const PLUGIN_NAME = 'mocker';
const HANDLER_NAME_FIELD = 'mockerName';

export default (router: Router, localServerConfig: LocalServerConfig) => {
  // 创建 Parser 对象
  const mockerParser = new Parser({
    basePath: localServerConfig.mockServerPath as string,
    buildPath: localServerConfig.buildPath,
    watch: localServerConfig.watch,
  });

  const adminCGIBase = localServerConfig.getAdminCGIBase();

  // 获取所有的 mocker 列表
  const mockerList = mockerParser.getAllMocker();

  // GET ${adminCGIBase}/mocker 所有的 mocker 列表信息
  initGetList(router, adminCGIBase, PLUGIN_NAME, (req, res) => {
    const mockerList = mockerParser.getAllMocker();

    res.jsonp(mockerList);
  });

  // GET ${adminCGIBase}/mocker/:mockerName 获得这个 mocker 的信息
  initGetOne(router, adminCGIBase, PLUGIN_NAME, HANDLER_NAME_FIELD, (req, res) => {
    const result = mockerParser.getMockerByName(req.params[HANDLER_NAME_FIELD]);

    res.jsonp(result);
  });

  // POST ${adminCGIBase}/mocker/:mockerName 设置这个 mocker 的信息
  initPostOne(router, adminCGIBase, PLUGIN_NAME, HANDLER_NAME_FIELD, (req, res) => {
    const result = mockerParser.updateMocker(req.params[HANDLER_NAME_FIELD], req.body);

    res.jsonp(result);
  });

  // GET ${adminCGIBase}/mocker/:mockerName/readme 获得这个 mocker 的 readme 信息
  initGetOneReadMe(router, adminCGIBase, PLUGIN_NAME, HANDLER_NAME_FIELD, (req, res) => {
    res.jsonp({
      html: mockerParser.getReadMeContent(req.params[HANDLER_NAME_FIELD]),
    });
  });

  // GET ${adminCGIBase}/detail 获得配置项数据
  initGetAdminDetail(router, adminCGIBase, (req, res) => {
    res.jsonp({
      status: 200,
      url: req.url,
      hostname: req.hostname,
      ip: req.ip,
      method: req.method,
      body: req.body,
      params: req.params,
      query: req.query,
      path: req.path,
      config: localServerConfig,
      pkg: {
        [pkgInfo.name]: pkgInfo.version,
      },
    });
  });

  // 处理 plugin=xhr 的场景
  handleXhr(router, mockerList, mockerParser, localServerConfig);

  // 携带变量出去
  router._mockerParser = mockerParser;
};

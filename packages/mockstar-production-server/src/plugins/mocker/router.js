const mockstar = require('mockstar');

const baseRouter = require('../../server/router/base-router');

const handleXhr = require('./xhr');

const PLUGIN_NAME = 'mocker';
const HANDLER_NAME_FIELD = 'mockerName';

module.exports = (router, localServerConfig) => {
    // 创建 Parser 对象
    const mockerParser = new mockstar.Parser({
        basePath: localServerConfig.mockServerPath,
        rootPath: localServerConfig.rootPath,
        buildPath: localServerConfig.buildPath,
        watch: localServerConfig.watch,
    });

    const adminCGIBase = localServerConfig.getAdminCGIBase();

    // 获取所有的 mocker 列表
    let mockerList = mockerParser.getAllMocker();

    // GET ${adminCGIBase}/mocker 所有的 mocker 列表信息
    baseRouter.initGetList(router, adminCGIBase, PLUGIN_NAME, (req, res) => {
        let mockerList = mockerParser.getAllMocker();

        res.jsonp(mockerList);
    });

    // GET ${adminCGIBase}/mocker/:namespace 所有的 mocker 列表信息
    baseRouter.initGetNamespaceList(router, adminCGIBase, PLUGIN_NAME, (req, res) => {
        const namespace = req.params.namespace ? req.params.namespace : 'common';
        let mockerList = mockerParser.getNamespaceAllMocker(false, namespace);

        res.jsonp(mockerList);
    });

    // GET ${adminCGIBase}/mocker/:mockerName 获得这个 mocker 的信息
    baseRouter.initGetOne(router, adminCGIBase, PLUGIN_NAME, HANDLER_NAME_FIELD, (req, res) => {
        let result = mockerParser.getMockerByName(req.params[HANDLER_NAME_FIELD]);

        res.jsonp(result);
    });

    // GET ${adminCGIBase}/mocker/:namespace/:mockerName 获得这个 mocker 的信息
    baseRouter.initGetNamespaceOne(router, adminCGIBase, PLUGIN_NAME, HANDLER_NAME_FIELD, (req, res) => {
        const namespace = req.params.namespace ? req.params.namespace : 'common';
        let result = mockerParser.getNamespaceMockerByName(req.params[HANDLER_NAME_FIELD], false, namespace);

        res.jsonp(result);
    });

    // POST ${adminCGIBase}/mocker/:mockerName 设置这个 mocker 的信息
    baseRouter.initPostOne(router, adminCGIBase, PLUGIN_NAME, HANDLER_NAME_FIELD, (req, res) => {
        let result = mockerParser.updateMocker(req.params[HANDLER_NAME_FIELD], req.body);

        res.jsonp(result);
    });

    // POST ${adminCGIBase}/mocker/:namespace/:mockerName 设置这个 mocker 的信息
    baseRouter.initPostNamespaceOne(router, adminCGIBase, PLUGIN_NAME, HANDLER_NAME_FIELD, (req, res) => {
        const namespace = req.params.namespace ? req.params.namespace : 'common';
        let result = mockerParser.updateNamespaceMocker(req.params[HANDLER_NAME_FIELD], req.body, namespace);

        res.jsonp(result);
    });

    // GET ${adminCGIBase}/mocker/:mockerName/readme 获得这个 mocker 的 readme 信息
    baseRouter.initGetOneReadMe(router, adminCGIBase, PLUGIN_NAME, HANDLER_NAME_FIELD, (req, res) => {
        res.jsonp({
            html: mockerParser.getReadMeContent(req.params[HANDLER_NAME_FIELD])
        });
    });

    // GET ${adminCGIBase}/mocker/:namespace/:mockerName/readme 获得这个 mocker 的 readme 信息
    baseRouter.initGetNamespaceOneReadMe(router, adminCGIBase, PLUGIN_NAME, HANDLER_NAME_FIELD, (req, res) => {
        const namespace = req.params.namespace ? req.params.namespace : 'common';
        res.jsonp({
            html: mockerParser.getNamespaceReadMeContent(req.params[HANDLER_NAME_FIELD], namespace)
        });
    });

    // GET ${adminCGIBase}/detail 获得配置项数据
    baseRouter.initGetAdminDetail(router, adminCGIBase, (req, res) => {
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
            config: localServerConfig
        });
    });

    // 处理 plugin=xhr 的场景
    handleXhr(router, mockerList, mockerParser, localServerConfig);

    // 携带变量出去
    router._mockerParser = mockerParser;
};

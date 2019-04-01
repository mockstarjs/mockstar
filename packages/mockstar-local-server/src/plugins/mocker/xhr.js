const _ = require('lodash');
const mockstar = require('mockstar');

module.exports = (router, mockerList, mockerParser, localServerConfig) => {
    let { namespace } = localServerConfig;

    // 根据用户配置的路由关系，进行解析
    // console.log('mockerList', mockerList);
    mockerList.forEach((mockerItem) => {
        // console.log(mockerItem);

        // mocker 的配置项在其 config 字段中
        const mockerConfig = mockerItem.config;

        // 只处理 plugin=xhr 的场景
        if (mockerConfig.plugin !== 'xhr') {
            return;
        }

        // 判断是否存在 route 字段，如果没有，则不再处理
        const ROUTE_PATH = mockerConfig.route;
        if (!ROUTE_PATH) {
            console.error('unknown ROUTE_PATH', mockerConfig);
            return;
        }

        // 默认是 get 请求，除非定义 method 字段
        const METHOD = (mockerConfig.method || 'get').toLowerCase();

        // http://expressjs.com/en/4x/api.html#router.METHOD
        router[METHOD](ROUTE_PATH, function (req, res, next) {
            handleCallback(req, res, next, {
                routePath: ROUTE_PATH,
                mockerItem: mockerItem,
                mockerParser: mockerParser
            });
        });

        // 如果有定义 namespace，则需要额外支持有 namespace 的场景
        if (namespace) {
            router[METHOD](new RegExp('/' + namespace + ROUTE_PATH), function (req, res, next) {
                handleCallback(req, res, next, {
                    routePath: ROUTE_PATH,
                    mockerItem: mockerItem,
                    mockerParser: mockerParser
                });
            });
        }

    });
};

function handleCallback(req, res, next, opts = {}) {
    // Express的req对象，详见 http://expressjs.com/en/4x/api.html#req

    // post 请求
    // handlerData.route="/cgi-bin/a/b/post_cgi"
    // post http://localhost:9527/cgi-bin/a/b/post_cgi data={activeModule:"error_not_login"}
    // req.baseUrl=""
    // req.originalUrl="/cgi-bin/a/b/post_cgi"
    // req.url="/cgi-bin/a/b/post_cgi"
    // req.method="POST"
    // req.OriginalMethod="POST"
    // req.body.activeModule = "error_not_login"
    // req.body = data

    // get 请求
    // handlerData.route="/cgi-bin/a/b/simple_cgi"
    // get http://localhost:9527/cgi-bin/a/b/simple_cgi?activeModule=error_not_login
    // req.baseUrl=""
    // req.originalUrl="/cgi-bin/a/b/simple_cgi?activeModule=error_not_login"
    // req.url="/cgi-bin/a/b/simple_cgi?activeModule=error_not_login"
    // req.method="GET"
    // req.OriginalMethod="GET"
    // req.query.activeModule = "error_not_login"

    // get 请求且route为匹配类型
    // handlerData.route="/cgi-bin/a/b/id/:id"
    // get http://localhost:9527/cgi-bin/a/b/id/1?activeModule=error_not_login
    // req.baseUrl=""
    // req.originalUrl="/cgi-bin/a/b/id/1?activeModule=error_not_login"
    // req.url="/cgi-bin/a/b/id/1?activeModule=error_not_login"
    // req.method="GET"
    // req.OriginalMethod="GET"
    // req.query.activeModule = "error_not_login"
    // req.params.id = "1"

    // console.log(req.headers.referer)
    // console.log('req.headers.cookie:', req.headers.cookie);

    // 由于使用了 cookie-parser 插件，因此可以直接使用req.cookies.xxx 来获取cookie值
    // console.log('req.cookies:', req.cookies);

    // res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', req.get('Origin'));

    const { routePath, mockerItem, mockerParser } = opts;

    let isDisabled;

    // 判断该路由的名字是否在referer中
    let mockstarQueryItem = mockstar.getQueryItem(req.headers.referer, mockerItem.name);

    if (mockstarQueryItem) {
        // referer 里面的请求参数拥有最高优先级，因为这种场景比较特殊，主要用于自动化测试之用
        isDisabled = mockstarQueryItem.isDisabled();
    } else {
        // 从请求 req 或者 config.json 文件中检查当前请求是否需要禁用 mock 服务
        const QUERY_KEY = '_ms_disable';
        isDisabled = req.query[QUERY_KEY] || req.body[QUERY_KEY];
        if (!isDisabled) {
            // 此处要重新获取新的数据，以便取到缓存的。
            // TODO 此处还可以优化，比如及时更新缓存中的数据，而不需要每次都去获取
            let curMockerItem = mockerParser.getMockerByName(mockerItem.name, true);
            isDisabled = curMockerItem.config.disable;
        }
    }

    if (isDisabled) {
        // 如果当前禁用了 handle 服务，则不处理
        res.locals.isDisabled = true;
        res.locals.mockerName = mockerItem.name;
        next();
    } else {
        let params = (req.method.toUpperCase() === 'POST') ? req.body : req.query;

        // 还要合并一下来自 url path 中的参数值
        // referer 里面的请求参数拥有最高优先级，因为这种场景比较特殊，主要用于自动化测试之用
        params = _.merge({}, params, req.params, mockstarQueryItem);

        const resInfo = mockerParser.getResInfoByRoute(routePath, params);

        if (!resInfo) {
            let errMsg = 'Could not get reqInfo by route=' + routePath + ' and params=' + JSON.stringify(params);
            console.error(errMsg);
            res.status(500).send(errMsg);
            return;
        }

        resInfo.mockModuleItem.getResult(params, req)
            .then((result) => {
                // 增加特定标记，以便抓包时能够识别是否为打桩数据
                res.append('x-mockstar-mocker', resInfo.mockerItem.name);
                res.append('x-mockstar-mock-module', resInfo.mockModuleItem.name);

                // 延时返回
                let delay = resInfo.mockModuleItem.config.delay || 0;
                res.append('x-mockstar-delay', delay + '');

                if (delay) {
                    setTimeout(() => {
                        res.jsonp(result);
                    }, delay);
                } else {
                    res.jsonp(result);
                }
            })
            .catch((err) => {
                // 注意 err 有可能是 Error 对象，也可能是普通的字符串或对象
                let errMsg = err && err.stack || err;

                console.error(errMsg);

                res.status(500).send(errMsg);
            });
    }
}
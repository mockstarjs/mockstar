const fs = require('fs');
const path = require('path');

//rewrite promise, bluebird is more faster
// require('babel-runtime/core-js/promise').default = require('bluebird');
global.Promise = require('bluebird');

// const babelCompileDirectory = require('babel-d');

const mockstarServer = require('./server');

const logger = require('./server/logger');
const mockstarLogger = logger.mockstarLogger();
const attentionLogger = logger.attentionLogger();

// 暴露一个全局log变量
global.mockstarLogger = mockstarLogger;
global.attentionLogger = attentionLogger;

class RunServer {
    /**
     * @param {Object} localServerConfig 配置项参数
     * @param {String} localServerConfig.rootPath 项目根目录
     * @param {String} [localServerConfig.buildPath] 构建之后的目录
     * @param {String} [localServerConfig.logPath] 日志目录
     * @param {String} [localServerConfig.mockServerPath]  mock server 根目录
     * @param {Number} [localServerConfig.port] 端口号
     * @param {String} [localServerConfig.name] pm2 应用的名字
     */
    constructor(localServerConfig) {
        if (!localServerConfig) {
            throw new Error('Invalid param!');
        }

        this.localServerConfig = localServerConfig;

        this.router = null;
        this.middleware = null;
        this.app = null;
        this.server = null;

        this.html = '';

    }

    /**
     * 启动服务
     *
     * @param {Function} callback 回调函数
     */
    start(callback) {
        this._initBabel();
        this._initLog();

        this._createRouter();
        this._createMiddleware();
        this._createApp();
        this._createServer();
        this._startServer(callback);
    }

    /**
     * 停止服务
     * @param {Function} callback 回调函数
     */
    stop(callback) {
        this._stopServer(callback);
    }

    /**
     * babel 编译等预处理
     * @private
     */
    _initBabel() {
        // babelCompileDirectory(localServerConfig.SRC_PATH, localServerConfig.APP_PATH);
    }

    /**
     * 初始化日志打印
     * @private
     */
    _initLog() {
        logger.init(this.localServerConfig.logPath);
        mockstarLogger.info(this.localServerConfig);
    }

    /**
     * 获得 mockstar 的路由
     * @private
     */
    _createRouter() {
        this.router = mockstarServer.router(this.localServerConfig);
    }

    /**
     * 获得 mockstar 的中间件
     * @private
     */
    _createMiddleware() {
        this.middleware = mockstarServer.middleware();
    }

    /**
     * 获得 mockstar 的 express 应用
     * @private
     */
    _createApp() {
        const self = this;
        const app = mockstarServer.create();

        const adminSiteRootPath = this.localServerConfig.getAdminSiteRootPath();
        const adminSiteBase = this.localServerConfig.getAdminSiteBase();

        // Set default middlewares (logger, static, cors and no-cache)
        app.use(this.middleware);

        // 如果访问的是根目录，则跳转到首页
        // GET adminSiteRootPath，跳转到 adminPageHome
        // GET /，跳转到 /mockstar-admin/dashboard
        // TODO 这里的规则似乎没有生效
        app.get(adminSiteRootPath, function (req, res) {
            res.redirect(`${adminSiteBase}/dashboard`);
        });

        // app.get('/mytest', function (req, res) {
        //     res.send('hello,world!');
        // });

        // 静态资源的配置
        // GET ${adminSiteBase}/mockers/:name/static/* 静态资源
        // http://localhost:9527/mockstar-admin/mockers/demo_03/static/sub/workflow.png
        app.get(`${adminSiteBase}/mockers/:mockerName/static/*`, (req, res) => {
            // req.params[0] = 'sub/workflow.png'
            // req.params.name = 'demo_03'

            let mockerName = req.params.mockerName;
            let mockerItem = this.router._mockerParser.getMockerByName(mockerName);
            let staticRelativePath = path.join('static', req.params[0]);

            if (!mockerItem) {
                res.send(`Can not find ${path.join(mockerName, staticRelativePath)}`);
            } else {
                res.sendFile(path.join(mockerItem.basePath, staticRelativePath));
            }
        });

        // 单页应用，因此只要是 ${adminSiteBase}/* 的都加载静态html页面
        // GET ${adminSiteBase}/*
        app.get(`${adminSiteBase}/*`, function (req, res) {
            // res.sendFile(path.join(__dirname, '../webui/build', 'index.html'));
            // 这里没有使用 res.sendFile，原因是需要将一些参数项放在 index.html 上

            self._getHtml()
                .then((data) => {
                    res.send(data);
                })
                .catch((err) => {
                    res.status(500).send(err);
                });
        });

        // 日志打印模块
        app.use(logger.connectLogger());

        // To handle POST, PUT and PATCH you need to use a body-parser
        // You can use the one used by JSON Server
        app.use(mockstarServer.bodyParser);
        app.use((req, res, next) => {
            if (req.method === 'POST') {
                req.body.createdAt = Date.now();
            }
            // Continue to JSON Server router
            next();
        });

        // Use handler router
        app.use(this.router);

        this.app = app;
    }

    _getHtml() {
        return new Promise((resolve, reject) => {
            if (this.html) {
                return resolve(this.html);
            }

            fs.readFile(path.join(__dirname, '../webui/build', 'index.html'), 'utf8', (err, content) => {
                if (err) {
                    reject(err);
                } else {
                    // 需要插入到 html head 的脚本
                    const injectInHead = '<script>window._mockstar_config_=' + JSON.stringify(this.localServerConfig) + '</script>';

                    // 替换内容
                    this.html = content.replace('</head>', injectInHead + '</head>');

                    resolve(this.html);
                }
            });
        });
    }

    /**
     * 获得 mockstar 的 server
     * @private
     */
    _createServer() {
        // https://socket.io/get-started/chat/#The-web-framework
        // 2018.10.23 突然无法启动websocket，原因未知
        // let server = require('http').createServer(app);
        // https://socket.io/docs/#Using-with-Express
        let server = require('http').Server(this.app);

        // TODO 触发 onBeforeServerListen 事件
        // 如果启动了 plugin=async 则开启 websocket
        if (this.router._mockerParser.isSupportAsync()) {
            require('./plugins/mocker/websocket')(this.localServerConfig, server, this.router._mockerParser);
        }

        this.server = server;
    }

    /**
     * 启动 mockstar 的 server
     * @param {Function} callback 回调函数
     * @private
     */
    _startServer(callback) {
        this.server.listen(this.localServerConfig.port, () => {
            // mockstarLogger.info('mockstar server is running');
            console.log('mockstar server is running!');
            console.log('Use your device to visit the following URL list, gets the IP of the URL you can visit:');
            console.log('\n');
            console.log(`http://127.0.0.1:${this.localServerConfig.port}/`);
            console.log('\n');

            // 启动成功之后进行回调
            if (typeof callback === 'function') {
                callback(true, Object.assign({}, this.localServerConfig));
            }
        });
    }

    /**
     * 停止 mockstar 的 server
     * @param {Function} callback 回调函数
     * @private
     */
    _stopServer(callback) {
        this.server.close(callback);
    }
}

/**
 * 启动服务
 *
 * @param {LocalServerConfig} localServerConfig 配置项参数
 * @param {String} localServerConfig.rootPath 项目根目录
 * @param {String} [localServerConfig.buildPath] 构建之后的目录
 * @param {String} [localServerConfig.logPath] 日志目录
 * @param {String} [localServerConfig.mockServerPath]  mock server 根目录
 * @param {Number} [localServerConfig.port] 端口号
 * @param {String} [localServerConfig.name] pm2 应用的名字
 * @param {Function} callback 回调函数
 */
module.exports = (localServerConfig, callback) => {
    let runServer = new RunServer(localServerConfig);

    runServer.start(callback);

    return runServer;
};
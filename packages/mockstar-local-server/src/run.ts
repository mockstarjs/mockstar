import fs from 'fs';
import path from 'path';
import http from 'http';
import express from 'express';
import { Router } from './types';
import * as mockstarServer from './server';
import * as logger from './server/logger';
import { LocalServerConfig } from './config/LocalServerConfig';
import websocket from './plugins/mocker/websocket';
import { getIndexHtmlPath } from 'mockstar-webui';

const mockstarLogger = logger.mockstarLogger();
const attentionLogger = logger.attentionLogger();

// 暴露一个全局log变量
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.mockstarLogger = mockstarLogger;
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.attentionLogger = attentionLogger;

export class RunServer {
  localServerConfig: LocalServerConfig;
  router: Router | null;
  middleware: (express.Handler | express.ErrorRequestHandler)[] | null;
  app: express.Express | null;
  server: http.Server | null;
  html = '';

  /**
   * @param {Object} localServerConfig 配置项参数
   */
  constructor(localServerConfig: LocalServerConfig) {
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
  start(callback?: (status: boolean, opt: any) => void) {
    this.initBabel();
    this.initLog();

    this.createRouter();
    this.createMiddleware();
    this.createApp();
    this.createServer();
    this.startServer(callback);
  }

  /**
   * 停止服务
   * @param {Function} callback 回调函数
   */
  stop(callback: (err?: Error | undefined) => void) {
    this.stopServer(callback);
  }

  /**
   * 重启服务
   * @param {Function} callback 回调函数
   */
  restart(callback: (status: boolean, opt: any) => void) {
    // 先停止
    this.stop(() => {
      // 再重新启动
      this.start(callback);
    });
  }

  /**
   * babel 编译等预处理
   * @private
   */
  private initBabel() {
    // babelCompileDirectory(localServerConfig.SRC_PATH, localServerConfig.APP_PATH);
  }

  /**
   * 初始化日志打印
   * @private
   */
  private initLog() {
    logger.init(this.localServerConfig.logPath);
    mockstarLogger.info(this.localServerConfig);
  }

  /**
   * 获得 mockstar 的路由
   * @private
   */
  private createRouter() {
    this.router = mockstarServer.router(this.localServerConfig) as Router;
  }

  /**
   * 获得 mockstar 的中间件
   * @private
   */
  private createMiddleware() {
    this.middleware = mockstarServer.middleware();
  }

  /**
   * 获得 mockstar 的 express 应用
   * @private
   */
  private createApp() {
    const app = mockstarServer.create();

    const adminSiteRootPath = this.localServerConfig.getAdminSiteRootPath();
    const adminSiteBase = this.localServerConfig.getAdminSiteBase();

    // Set default middlewares (logger, static, cors and no-cache)
    app.use(this.middleware as express.Handler[]);

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

      const mockerName = req.params.mockerName;
      const mockerItem = this.router?._mockerParser.getMockerByName(mockerName);
      const staticRelativePath = path.join('static', req.params[0]);

      if (!mockerItem) {
        res.send(`Can not find ${path.join(mockerName, staticRelativePath)}`);
      } else {
        res.sendFile(path.join(mockerItem.basePath, staticRelativePath));
      }
    });

    // 单页应用，因此只要是 ${adminSiteBase}/* 的都加载静态html页面
    // GET ${adminSiteBase}/*
    app.get(`${adminSiteBase}/*`, (req, res) => {
      // res.sendFile(path.join(__dirname, '../webui/build', 'index.html'));
      // 这里没有使用 res.sendFile，原因是需要将一些参数项放在 index.html 上

      this.getHtml()
        .then(data => {
          res.send(data);
        })
        .catch(err => {
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

      // 每次请求都将本地的配置信息透传到前端页面
      // res.locals.localServerConfig = this.localServerConfig.getShowDataInWeb();

      // Continue to JSON Server router
      next();
    });

    // Use handler router
    app.use(this.router as Router);

    this.app = app;
  }

  private getHtml() {
    return new Promise((resolve, reject) => {
      if (this.html) {
        return resolve(this.html);
      }

      fs.readFile(getIndexHtmlPath(), 'utf8', (err, content) => {
        if (err) {
          reject(err);
        } else {
          // 需要插入到 html head 的脚本
          const injectInHead =
            '<script>window._mockstar_config_=' +
            JSON.stringify(this.localServerConfig.getShowDataInWeb()) +
            '</script>';

          // 替换内容
          this.html = content.replace('</head>', injectInHead + '</head>');

          // 如果需要自定义静态资源的根路径，则还需要进行替换
          const { staticBasePath } = this.localServerConfig;
          if (staticBasePath && staticBasePath !== '/') {
            this.html = this.html.replace('/static/css/', staticBasePath + 'static/css/');
            this.html = this.html.replace('/static/js/', staticBasePath + 'static/js/');
          }

          resolve(this.html);
        }
      });
    });
  }

  /**
   * 获得 mockstar 的 server
   * @private
   */
  private createServer() {
    // https://socket.io/get-started/chat/#The-web-framework
    // 2018.10.23 突然无法启动websocket，原因未知
    // let server = require('http').createServer(app);
    // https://socket.io/docs/#Using-with-Express
    const server = require('http').Server(this.app);

    // TODO 触发 onBeforeServerListen 事件
    // 如果启动了 plugin=async 则开启 websocket
    if (this.router?._mockerParser.isSupportAsync()) {
      websocket(server, this.router?._mockerParser);
    }

    this.server = server;
  }

  /**
   * 启动 mockstar 的 server
   * @param {Function} callback 回调函数
   * @private
   */
  private startServer(callback?: (status: boolean, opt: any) => void) {
    this.server?.listen(this.localServerConfig.port, () => {
      // mockstarLogger.info('mockstar server is running');
      console.log('mockstar server is running!');
      console.log(
        'Use your device to visit the following URL list, gets the IP of the URL you can visit:',
      );
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
  private stopServer(callback: (err?: Error | undefined) => void) {
    this.server?.close(callback);
  }
}

/**
 * 启动服务
 *
 * @param {LocalServerConfig} localServerConfig 配置项参数
 * @param {Function} callback 回调函数
 */
export default (
  localServerConfig: LocalServerConfig,
  callback?: (status: boolean, opt: any) => void,
) => {
  const runServer = new RunServer(localServerConfig);

  runServer.start(callback);

  // 需要监听文件的变化自动重启
  if (localServerConfig.watch) {
    console.log('watching...');

    // 文件变化之后延时重启的时间，单位 ms
    const delayRestart = 100;

    // 当前是否正在重启中
    let isRestarting = false;

    // 请求重启的队列
    let queue = [];

    let delayT: NodeJS.Timeout;

    function restart() {
      if (delayT) {
        clearTimeout(delayT);
      }

      delayT = setTimeout(() => {
        // 如果当时正在重启中，则先放入到缓存队列中
        if (isRestarting) {
          queue.push(Date.now());
          return;
        }

        isRestarting = true;

        // 重新启动
        runServer.restart(() => {
          // 如果重启的过程中还有变化，则继续重新启动
          if (queue.length) {
            queue = [];
            restart();
          } else {
            isRestarting = false;
          }
        });
      }, delayRestart);
    }

    fs.watch(localServerConfig.mockServerPath, { recursive: true }, (event, filename) => {
      console.log('watch testFolder event', event);
      console.log('watch testFolder filename', filename);

      restart();
    });
  }

  return runServer;
};

import express from 'express';
import methodOverride from 'method-override';
import _ from 'lodash';
import request from 'request';
import {MS_FROM} from 'mockstar';
import {parser} from '../body-parser';
import {LocalServerConfig} from '../../config/LocalServerConfig';
import initPlugins from '../../plugins';
import {Router} from '../../types';

export default (localServerConfig: LocalServerConfig) => {
  // Create router
  // http://expressjs.com/en/4x/api.html#router
  const router = express.Router();

  // Add middlewares
  router.use(methodOverride());
  router.use(parser);

  // 所有的请求都会经过这里，可以做一些类似权限控制的事情
  router.all('*', function (req, res, next) {
    // res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', req.get('Origin'));
    next();
  });

  // 初始化插件
  initPlugins(router as Router, localServerConfig);

  router.use((req, res) => {
    // get 请求
    // get http://localhost:9527/cgi-bin/a/b/not_exist_cgi?activeModule=error_not_login
    // req.headers.host="localhost:9527"
    // req.params[0]="/cgi-bin/a/b/not_exist_cgi"
    // req.baseUrl=""
    // req.originalUrl="/cgi-bin/a/b/not_exist_cgi?activeModule=error_not_login"
    // req.url="/cgi-bin/a/b/not_exist_cgi?activeModule=error_not_login"
    // req.method="GET"
    // req.OriginalMethod="GET"
    // req.query.activeModule = "error_not_login"

    // post 请求
    // post http://localhost:9527/cgi-bin/a/b/not_exist_cgi data={activeModule:"error_not_login"}
    // req.params[0]="/cgi-bin/a/b/not_exist_cgi"
    // req.baseUrl=""
    // req.originalUrl="/cgi-bin/a/b/not_exist_cgi"
    // req.url="/cgi-bin/a/b/not_exist_cgi"
    // req.method="POST"
    // req.OriginalMethod="POST"
    // req.body.activeModule = "error_not_login"

    // 未匹配到的请求将会来到这里
    console.log('[use]', req.url, req.query._ms_from);

    // 判断是否已经是第二次请求了。
    // 请求本地服务的时候，可能会陷入死循环中，因此此处校验最多只请求一次。
    const isRequested = !!req.query[MS_FROM];

    const opts = {
      url: 'http://' + req.headers.host + req.url,
      headers: req.headers,
      jar: true,
      // timeout: 4000,
      qs: {
        [MS_FROM]: 1,
      },
    };

    // 设置当前请求是被匹配住了，但是因为配置了忽略，因此最终走现网数据，不用 mock
    if (res.locals.isDisabled) {
      res.append('x-mockstar-disable', res.locals.mockerName);
    }

    if (req.method === 'GET' && !isRequested) {
      request
        .get(_.merge({}, opts))
        .on('response', function (response) {
          // console.log(response.statusCode) // 200
        })
        .on('error', function (err) {
          console.error(err);
          res.status(500).send(err.stack);
        })
        .pipe(res);
    } else if (req.method === 'POST' && !isRequested) {
      request
        .post(
          _.merge({}, opts, {
            form: req.body,
          }),
        )
        .on('response', function (response) {
          // console.log(response.statusCode)
        })
        .on('error', function (err) {
          console.error(err);
          res.status(500).send(err.stack);
        })
        .pipe(res);
    } else {
      res.status(404).jsonp({
        status: 404,
        url: req.url,
        hostname: req.hostname,
        ip: req.ip,
        method: req.method,
        body: req.body,
        params: req.params,
        query: req.query,
        path: req.path,
        config: localServerConfig,
      });
    }
  });

  router.use(((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(err.stack);
  }) as express.ErrorRequestHandler);

  return router;
};

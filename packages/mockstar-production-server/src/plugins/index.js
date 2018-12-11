const mockerRouter = require('./mocker/router');

module.exports = (router, localServerConfig) => {

  // 初始化 mocker
  mockerRouter(router, localServerConfig);

};

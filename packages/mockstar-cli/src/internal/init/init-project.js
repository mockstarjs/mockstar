const initProject = require('../../../biz/generators/project');

/**
 * 初始化一个 project
 */
module.exports = function (args) {
  let options = {
    isDev: !!args.dev,
    autoInstall: true,
    cwd: process.cwd(),
  };

  return new Promise((resolve, reject) => {
    initProject(options, (isSuccess, data) => {
      isSuccess ? resolve() : reject();
    });
  });
};

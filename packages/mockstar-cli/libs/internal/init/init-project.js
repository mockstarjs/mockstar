const initProject = require('../../../biz/generators/project');

/**
 * 初始化一个 project
 */
module.exports = function (args) {
    let options = {
        isDev: !!args.dev,
        parentPath: process.cwd()
    };

    return new Promise((resolve, reject) => {
        initProject(options, (isSuccess, data) => {
            isSuccess ? resolve() : reject();
        });
    });
};

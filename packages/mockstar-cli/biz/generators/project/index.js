const path = require('path');
const mockstarGenerators = require('mockstar-generators');
const inquirer = require('inquirer');
const fse = require('fs-extra');

module.exports = function (opts, callback) {
    inquirer
        .prompt([{
            type: 'input',
            name: 'projectName',
            message: '请输入项目名称，只能够输入英文、数字和、- 及 _ ',
            default: 'mockstar-app',
            validate: function (projectName) {
                if (!projectName) {
                    return '项目名称不能为空';
                }

                // 默认情况下是在当前路径下新建以 projectName 为名字的文件夹，然后再进入其中生成代码。
                // 但如果当前路径下已经存在了，则需要进行提示，避免覆盖
                if (!opts.isDev && fse.pathExistsSync(path.join(opts.parentPath, projectName))) {
                    return `当前目录下已经存在名字为 ${projectName} 的文件夹了`;
                }

                return true;
            }
        }])
        .then(answers => {
            opts.name = answers.projectName;

            mockstarGenerators.initProject(opts)
                .then(() => {
                    callback(true);
                })
                .catch((err) => {
                    callback(false, err);
                });
        });
};
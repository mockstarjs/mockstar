'use strict';

const path = require('path');
const mkdirp = require('mkdirp');
const Generator = require('yeoman-generator');
const shell = require('shelljs');
const fse = require('fs-extra');

const MockerConfig = require('./MockerConfig');

module.exports = class extends Generator {

    constructor(...args) {
        super(...args);

        // 配置参数
        this.mockerConfig = new MockerConfig(this.options.mockerOpts);
    }

    /**
     * Show template basic message.
     */
    initializing() {
        if (this.mockerConfig.isDev) {
            console.log('--initializing--', this.mockerConfig);
        }
    }

    /**
     * Interact with developer.
     */
    // prompting() {
    //     let isDev = this.options.isDev;
    //     let cwd = this.options.env.cwd;
    //
    //     return this.prompt([{
    //         type: 'list',
    //         name: 'parentPath',
    //         message: '请选择 mocker 放置的根目录',
    //         choices: function () {
    //             // 获取可选择的路径
    //             return utils.getMockServerPathList(cwd) || [];
    //         },
    //         validate: function (parentPath) {
    //             if (!parentPath) {
    //                 return 'mocker 放置的根目录不能为空';
    //             }
    //
    //             return true;
    //         }
    //     }, {
    //         type: 'input',
    //         name: 'reqURL',
    //         message: '请输入CGI请求，例如： http://domain.com/a/b/c',
    //         validate: function (reqURL) {
    //             if (!reqURL) {
    //                 return '请输入CGI请求';
    //             }
    //
    //             return true;
    //         }
    //     }, {
    //         type: 'list',
    //         name: 'method',
    //         message: '请求类型',
    //         choices: ['get', 'post'],
    //         default: 'get'
    //     }, {
    //         type: 'input',
    //         name: 'mockerName',
    //         message: '请输入mocker名称，只能够输入英文、数字和、- 及 _ ',
    //         default: function (answers) {
    //             return utils.getMockerNameFromURL(answers.reqURL);
    //         },
    //         validate: function (mockerName, answers) {
    //             if (!mockerName) {
    //                 return 'mocker名称不能为空';
    //             }
    //
    //             // 默认情况下是在当前路径下新建以 projectName 为名字的文件夹，然后再进入其中生成代码。
    //             // 但如果当前路径下已经存在了，则需要进行提示，避免覆盖
    //             if (!isDev && fse.pathExistsSync(path.join(answers.parentPath, mockerName))) {
    //                 return `当前目录下已经存在名字为 ${mockerName} 的文件夹了`;
    //             }
    //
    //             return true;
    //         }
    //     }]).then((answers) => {
    //         this.answers = answers;
    //         this.mockerConfig.updateByAnswer(this.answers);
    //     });
    // }

    validate() {
        if (this.mockerConfig.isDev) {
            console.log('--validate--');
        }

        if (!this.mockerConfig.isDev && fse.pathExistsSync(path.join(this.mockerConfig.parentPath, this.mockerConfig.config.name))) {
            // 如果当前路径下已经存在了，则需要进行提示，避免覆盖
            return Promise.reject(`当前目录下已经存在名字为 ${this.mockerConfig.config.name} 的文件夹了`);
        } else if (!this.mockerConfig.config.route) {
            // 必须的参数验证
            return Promise.reject(`必须要配置 route`);
        }
    }

    /**
     * Generator project files.
     */
    writing() {
        const { parentPath, config } = this.mockerConfig;

        const _copyTemplates = () => {
            const folderPath = path.join(parentPath, config.name);

            mkdirp(folderPath);
            shell.cd(folderPath);

            this.destinationRoot(this.destinationPath(folderPath));

            this.fs.copyTpl(
                this.templatePath('_config'),
                this.destinationPath('config.json'),
                {
                    mockerConfig: this.mockerConfig
                }
            );

            this.fs.copyTpl(
                this.templatePath('README.md'),
                this.destinationPath('README.md'),
                {
                    mockerConfig: this.mockerConfig
                }
            );

            ['base.js', 'index.js', 'mock_modules', 'static'].forEach((curFile) => {
                this.fs.copy(
                    this.templatePath(curFile),
                    this.destinationPath(curFile)
                );
            });

        };

        _copyTemplates();
    }

    install() {
        if (this.mockerConfig.isDev) {
            console.log('--install--');
        }
    }

    end() {
        if (this.mockerConfig.isDev) {
            console.log('--end--');
        }
    }
};

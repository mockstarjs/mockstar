'use strict';

const path = require('path');
const chalk = require('chalk');
const mkdirp = require('mkdirp');
const Generator = require('yeoman-generator');
const shell = require('shelljs');
const Utils = require('./utils');
const utilsMockstar = require('./utils-mockstar');
const logger = require('./logger');
const fse = require('fs-extra');

const log = logger({});

module.exports = class extends Generator {

    constructor(...args) {
        super(...args);

        this.answers = {};
    }

    /**
     * Show template basic message.
     */
    initializing() {
        this.log(
            chalk.magenta(
                `\n欢迎使用 mockstar app 脚手架！\n`
            )
        );
    }

    /**
     * Interact with developer.
     */
    prompting() {
        let isDev = this.options.isDev;
        let cwd = this.options.env.cwd;

        return this.prompt([{
            type: 'list',
            name: 'initType',
            message: '请选择项目初始类型 ',
            choices: [{
                name: '初始化一个新项目',
                value: 'project'
            }, {
                name: '初始化一个mocker',
                value: 'mocker'
            }],
            default: 'project'
        }, {
            type: 'input',
            name: 'projectName',
            message: '请输入项目名称，只能够输入英文、数字和、- 及 _ ',
            default: 'mockstar-app',
            when: function (answers) {
                return answers.initType === 'project';
            },
            validate: function (projectName) {
                if (!projectName) {
                    return '项目名称不能为空';
                }

                // 默认情况下是在当前路径下新建以 projectName 为名字的文件夹，然后再进入其中生成代码。
                // 但如果当前路径下已经存在了，则需要进行提示，避免覆盖
                if (!isDev && fse.pathExistsSync(projectName)) {
                    return `当前目录下已经存在名字为 ${projectName} 的文件夹了`;
                }

                return true;
            }
        }, {
            type: 'list',
            name: 'mockerParentPath',
            message: '请选择mocker放置的根目录 ',
            choices: function (answers) {
                // 获取可选择的路径
                return utilsMockstar.getMockServerPathList(cwd);
            },
            when: function (answers) {
                return answers.initType === 'mocker';
            }
        }, {
            type: 'input',
            name: 'mockerName',
            message: '请输入mocker名称，只能够输入英文、数字和、- 及 _ ',
            when: function (answers) {
                return answers.initType === 'mocker';
            },
            validate: function (mockerName) {
                if (!mockerName) {
                    return 'mocker名称不能为空';
                }

                // 默认情况下是在当前路径下新建以 projectName 为名字的文件夹，然后再进入其中生成代码。
                // 但如果当前路径下已经存在了，则需要进行提示，避免覆盖
                if (!isDev && fse.pathExistsSync(mockerName)) {
                    return `当前目录下已经存在名字为 ${mockerName} 的文件夹了`;
                }

                return true;
            }
        }]).then((answers) => {
            this.answers = answers;
        });
    }

    /**
     * Generator project files.
     */
    writing() {
        const { initType, projectName, mockerParentPath, mockerName } = this.answers;
        console.log('--', this.answers);

        const _copyProjectTemplates = () => {
            const folderPath = path.resolve(projectName);

            // 默认情况下是在当前路径下新建以 projectName 为名字的文件夹，然后再进入其中生成代码。
            // 但如果当前路径下已经存在了，则需要进行提示。
            mkdirp(folderPath);
            shell.cd(folderPath);

            this.destinationRoot(this.destinationPath(folderPath));

            this.fs.copyTpl(
                this.templatePath('_package'),
                this.destinationPath('package.json'),
                {
                    projectName: projectName,
                    pkgVersion: this.options.pkgVersion
                }
            );

            this.fs.copy(
                this.templatePath('gitignore'),
                this.destinationPath('.gitignore')
            );

            this.fs.copy(
                this.templatePath('gitattributes'),
                this.destinationPath('.gitattributes')
            );

            this.fs.copyTpl(
                this.templatePath('_README.md'),
                this.destinationPath('README.md'),
                {
                    projectName: projectName
                }
            );

            this.fs.copy(
                this.templatePath('mockstar.config.js'),
                this.destinationPath('mockstar.config.js')
            );

            // copy mock_server
            const mockServerFilePaths = Utils.read(path.join(this.templatePath(), './mock_server/'));

            mockServerFilePaths.map((filePath) => {
                if (/_config/.test(filePath)) {
                    this.fs.copyTpl(
                        this.templatePath('./mock_server/' + filePath),
                        this.destinationPath('./mock_server/' + filePath.replace(/_config/,'config.json')),
                        {
                            mockerName: 'demo_cgi'
                        }
                    );
                } else {
                    this.fs.copy(
                        this.templatePath('./mock_server/' + filePath),
                        this.destinationPath('./mock_server/' + filePath)
                    );
                }
            });
        };

        const _copyMockerTemplates = () => {
            const mockerFilePaths = Utils.read(path.join(this.templatePath(), './mock_server/mockers/demo_cgi'));

            mockerFilePaths.map((filePath) => {
                if (/_config/.test(filePath)) {
                    this.fs.copyTpl(
                        this.templatePath('./mock_server/mockers/demo_cgi/' + filePath),
                        path.join(mockerParentPath, mockerName, filePath.replace(/_config/,'config.json')),
                        {
                            mockerName: mockerName
                        }
                    );
                } else {
                    this.fs.copy(
                        this.templatePath('./mock_server/mockers/demo_cgi/' + filePath),
                        path.join(mockerParentPath, mockerName, filePath)
                    );
                }
            });
        };

        switch (initType) {
            case 'project':
                _copyProjectTemplates();
                break;
            case 'mocker':
                _copyMockerTemplates();
                break;
            default:
                console.error('unknown initType', this.answers);
                break;
        }
    }

    install() {
        log.info('项目初始化完成');
    }

    end() {
        log.info(`本次初始化过程结束。接下来请继续执行以下命令完成安装：\n\t cd ${this.answers.projectName} && npm install。`);
    }
};

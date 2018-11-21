'use strict';

const path = require('path');
const chalk = require('chalk');
const mkdirp = require('mkdirp');
const Generator = require('yeoman-generator');
const shell = require('shelljs');
const fse = require('fs-extra');

const utils = require('../utils');

const ProjectConfig = require('./ProjectConfig');
const MockerConfig = require('../mocker/MockerConfig');

const logger = utils.createLogger({});

module.exports = class extends Generator {

    constructor(...args) {
        super(...args);

        this.answers = {};

        this.projectConfig = new ProjectConfig(this.options);
    }

    /**
     * Show template basic message.
     */
    initializing() {
        this.log(
            chalk.magenta(
                `\n欢迎使用 MockStar 脚手架来创建 project！\n`
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
                if (!isDev && fse.pathExistsSync(path.resolve(projectName))) {
                    return `当前目录下已经存在名字为 ${projectName} 的文件夹了`;
                }

                return true;
            }
        }]).then((answers) => {
            this.answers = answers;

            this.projectConfig.updateByAnswer(this.answers);
        });
    }

    /**
     * Generator project files.
     */
    writing() {
        const { projectName } = this.projectConfig;

        const _copyTemplates = () => {
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
                    projectConfig: this.projectConfig
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
                    projectConfig: this.projectConfig
                }
            );

            this.fs.copy(
                this.templatePath('mockstar.config.js'),
                this.destinationPath('mockstar.config.js')
            );

            this.fs.copy(
                this.templatePath('mock_server'),
                this.destinationPath('mock_server')
            );

            const demoMockerName = 'demo_cgi';

            const mockConfig = new MockerConfig({
                mockerParentPath: path.join(this.destinationPath(), './mock_server/mockers'),
                mockerName: demoMockerName,
                route: '/cgi-bin/a/b/' + demoMockerName
            });

            // 初始化一个 demo mocker
            ['base.js', 'index.js', 'mock_modules', 'static'].forEach((curFile) => {
                this.fs.copy(
                    path.join(this.templatePath(), '../../mocker/templates', curFile),
                    path.join(mockConfig.mockerParentPath, demoMockerName, curFile)
                );
            });

            this.fs.copyTpl(
                path.join(this.templatePath(), '../../mocker/templates/_config'),
                path.join(mockConfig.mockerParentPath, demoMockerName, 'config.json'),
                {
                    mockConfig: mockConfig
                }
            );

            this.fs.copyTpl(
                path.join(this.templatePath(), '../../mocker/templates/README.md'),
                path.join(mockConfig.mockerParentPath, demoMockerName, 'README.md'),
                {
                    mockConfig: mockConfig
                }
            );

        };

        _copyTemplates();
    }

    install() {
        logger.info('项目初始化完成');
    }

    end() {
        logger.info(`本次初始化过程结束。接下来请继续执行以下命令完成安装：\n\t cd ${this.projectConfig.projectName} && npm install。`);
    }
};

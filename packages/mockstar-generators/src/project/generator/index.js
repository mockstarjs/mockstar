'use strict';

const path = require('path');
const mkdirp = require('mkdirp');
const Generator = require('yeoman-generator');
const shell = require('shelljs');
const fse = require('fs-extra');

const ProjectConfig = require('./ProjectConfig');
const MockerConfig = require('../../mocker/generator/MockerConfig');

module.exports = class extends Generator {

    constructor(...args) {
        super(...args);

        // 配置参数
        this.projectConfig = new ProjectConfig(this.options.projectOpts);
    }

    /**
     * Show template basic message.
     */
    initializing() {
        if (this.projectConfig.isDev) {
            console.log('--initializing--', this.projectConfig);
        }
    }

    validate() {
        if (this.projectConfig.isDev) {
            console.log('--validate--');
        }

        if (!this.projectConfig.isDev && fse.pathExistsSync(path.join(this.projectConfig.parentPath, this.projectConfig.name))) {
            // 如果当前路径下已经存在了，则需要进行提示，避免覆盖
            return Promise.reject(`当前目录下已经存在名字为 ${this.projectConfig.name} 的文件夹了`);
        }
    }

    /**
     * Generator project files.
     */
    writing() {
        const { parentPath, name } = this.projectConfig;

        const _copyTemplates = () => {
            const folderPath = path.join(parentPath, name);

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
                this.templatePath('src'),
                this.destinationPath('src')
            );

            const demoMockerName = 'demo_cgi';

            const mockerConfig = new MockerConfig({
                isDev: false,
                parentPath: path.join(this.destinationPath(), './src/mockers'),
                config: {
                    description: '我是' + demoMockerName,
                    name: demoMockerName,
                    route: '/cgi-bin/a/b/' + demoMockerName
                }
            });

            const MOCKER_TEMPLATES_PATH = path.join(this.templatePath(), '../../../mocker/generator/templates');

            console.log('---MOCKER_TEMPLATES_PATH---', MOCKER_TEMPLATES_PATH);

            // 初始化一个 demo mocker
            ['base.js', 'index.js', 'mock_modules', 'static'].forEach((curFile) => {
                this.fs.copy(
                    path.join(MOCKER_TEMPLATES_PATH, curFile),
                    path.join(mockerConfig.parentPath, demoMockerName, curFile)
                );
            });

            this.fs.copyTpl(
                path.join(MOCKER_TEMPLATES_PATH, '_config'),
                path.join(mockerConfig.parentPath, demoMockerName, 'config.json'),
                {
                    mockerConfig: mockerConfig
                }
            );

            this.fs.copyTpl(
                path.join(MOCKER_TEMPLATES_PATH, 'README.md'),
                path.join(mockerConfig.parentPath, demoMockerName, 'README.md'),
                {
                    mockerConfig: mockerConfig
                }
            );
        };

        _copyTemplates();
    }

    install() {
        if (this.projectConfig.isDev) {
            console.log('--install--');
        }
    }

    end() {
        if (this.projectConfig.isDev) {
            console.log('--end--');
        }
    }
};

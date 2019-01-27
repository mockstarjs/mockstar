'use strict';

const path = require('path');
const mkdirp = require('mkdirp');
const Generator = require('yeoman-generator');
const shell = require('shelljs');
const fse = require('fs-extra');

const ProjectConfig = require('./ProjectConfig');
const initMocker = require('../../mocker');

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

            mkdirp.sync(folderPath);
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

            this.fs.copyTpl(
                this.templatePath('mockstar.config'),
                this.destinationPath('mockstar.config.js'),
                {
                    projectConfig: this.projectConfig
                }
            );

            this.fs.copy(
                this.templatePath('src'),
                this.destinationPath('src')
            );

            // 增加一个简单的 mocker 即可
            const demoMockerName = 'demo_cgi';

            initMocker({
                isDev: this.projectConfig.isDev,
                parentPath: path.join(this.destinationPath(), './src/mockers'),
                isInitReadme: true,
                config: {
                    description: '我是' + demoMockerName,
                    name: demoMockerName,
                    route: '/cgi-bin/a/b/' + demoMockerName
                }
            });
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

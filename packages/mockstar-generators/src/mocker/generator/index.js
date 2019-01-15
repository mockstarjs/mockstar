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
        const { parentPath, config, isInitReadme } = this.mockerConfig;

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

            ['base.js', 'index.js', 'mock_modules'].forEach((curFile) => {
                this.fs.copy(
                    this.templatePath(curFile),
                    this.destinationPath(curFile)
                );
            });

            if (isInitReadme) {
                this.fs.copyTpl(
                    this.templatePath('README.md'),
                    this.destinationPath('README.md'),
                    {
                        mockerConfig: this.mockerConfig
                    }
                );

                this.fs.copy(
                    this.templatePath('static'),
                    this.destinationPath('static')
                );
            }

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

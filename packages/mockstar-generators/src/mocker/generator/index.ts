import path from 'path';
import mkdirp from 'mkdirp';
import Generator from 'yeoman-generator';
import shell from 'shelljs';
import fs from 'fs-extra';
import walkSync from 'walk-sync';

import { MockerConfig } from './MockerConfig';

export default class extends Generator {
  mockerConfig: MockerConfig;

  constructor(args: string | string[], options: Record<string, unknown>) {
    super(args, options);

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

    if (
      !this.mockerConfig.isDev &&
      fs.pathExistsSync(
        path.join(this.mockerConfig.parentPath, this.mockerConfig.config.name as string),
      )
    ) {
      // 如果当前路径下已经存在了，则需要进行提示，避免覆盖
      return Promise.reject(`当前目录下已经存在名字为 ${this.mockerConfig.config.name} 的文件夹了`);
    } else if (!this.mockerConfig.config.route) {
      // 必须的参数验证
      return Promise.reject(`必须要配置 route`);
    }

    return Promise.resolve();
  }

  /**
   * Generator project files.
   */
  writing() {
    const { parentPath, config } = this.mockerConfig;

    const _copyTemplates = () => {
      const folderPath = path.join(parentPath, config.name as string);

      mkdirp.sync(folderPath);
      shell.cd(folderPath);

      this.destinationRoot(this.destinationPath(folderPath));

      // 遍历模板下的所有文件
      const allFiles: string[] = [];
      walkSync.entries(this.sourceRoot()).forEach(entry => {
        if (!entry.isDirectory()) {
          allFiles.push(entry.relativePath);
        }
      });

      // 如果以 .ejs 为结尾的则默认为模板文件
      allFiles.forEach((curFile: string) => {
        if (path.extname(curFile) === '.ejs') {
          this.fs.copyTpl(
            this.templatePath(curFile),
            this.destinationPath(curFile.replace(/\.ejs$/, '')),
            {
              mockerConfig: this.mockerConfig,
            },
          );
        } else {
          this.fs.copy(this.templatePath(curFile), this.destinationPath(curFile));
        }
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
}

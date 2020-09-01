import path from 'path';
import Generator from 'yeoman-generator';
import shell from 'shelljs';
import fse from 'fs-extra';
import walkSync from 'walk-sync';

import BusinessMocker from './BusinessMocker';
import pkgInfo from "../../pkg";

export default class extends Generator {
  businessMocker: BusinessMocker;

  constructor(args: string | string[], options: Record<string, unknown>) {
    super(args, options);

    // 配置参数
    this.businessMocker = new BusinessMocker(this.options.mockerOpts);
  }

  /**
   * Show template basic message.
   */
  initializing() {
    if (this.businessMocker.isDev) {
      console.log('--initializing--', this.businessMocker);
    }

    console.log();
    console.log(`${pkgInfo.name} v${pkgInfo.version} init mocker...`);
    console.log();
  }

  validate() {
    if (this.businessMocker.isDev) {
      console.log('--validate--');
    }

    if (
      !(this.businessMocker.isDev || this.businessMocker.force) &&
      fse.pathExistsSync(
        path.join(this.businessMocker.parentPath, this.businessMocker.config.name as string),
      )
    ) {
      // 如果当前路径下已经存在了，则需要进行提示，避免覆盖
      return Promise.reject(
        `当前目录下已经存在名字为 ${this.businessMocker.config.name} 的文件夹了`,
      );
    } else if (!this.businessMocker.config.route) {
      // 必须的参数验证
      return Promise.reject(`必须要配置 route`);
    }

    return Promise.resolve();
  }

  /**
   * Generator project files.
   */
  writing() {
    const { parentPath, config } = this.businessMocker;

    const _copyTemplates = () => {
      const folderPath = path.join(parentPath, config.name as string);

      fse.ensureDirSync(folderPath);
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
              businessMocker: this.businessMocker,
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
    if (this.businessMocker.isDev) {
      console.log('--install--');
    }
  }

  end() {
    if (this.businessMocker.isDev) {
      console.log('--end--');
    }
  }
}

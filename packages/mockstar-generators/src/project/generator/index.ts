import path from 'path';
import mkdirp from 'mkdirp';
import Generator from 'yeoman-generator';
import shell from 'shelljs';
import fs from 'fs-extra';

import { ProjectConfig } from './ProjectConfig';

import initMocker from '../../mocker';
import walkSync from 'walk-sync';

export default class extends Generator {
  projectConfig: ProjectConfig;

  constructor(args: string | string[], options: {}) {
    super(args, options);

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

    if (
      !this.projectConfig.isDev &&
      fs.pathExistsSync(path.join(this.projectConfig.parentPath, this.projectConfig.name))
    ) {
      // 如果当前路径下已经存在了，则需要进行提示，避免覆盖
      return Promise.reject(`当前目录下已经存在名字为 ${this.projectConfig.name} 的文件夹了`);
    }

    return Promise.resolve();
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
              projectConfig: this.projectConfig,
            },
          );
        } else {
          this.fs.copy(this.templatePath(curFile), this.destinationPath(curFile));
        }
      });

      // 增加一个简单的 mocker 即可
      const demoMockerName = 'demo_cgi';

      return initMocker({
        isDev: this.projectConfig.isDev,
        parentPath: path.join(this.destinationPath(), './mock_server'),
        isInitReadme: true,
        config: {
          description: '我是' + demoMockerName,
          name: demoMockerName,
          route: '/cgi-bin/a/b/' + demoMockerName,
          method: 'get',
        },
        debugMockModuleJsonData: {
          retcode: 0,
          result: {
            uid: 99999,
            type: 9,
            description: '我是 debug',
            other_msg: '仅作为临时调试用，建议按照不同的场景构造不同的 mock module!',
          },
        },
      });
    };

    return _copyTemplates();
  }

  install() {
    if (this.projectConfig.isDev) {
      console.log('--install--');
    }

    if (this.projectConfig.autoInstall) {
      console.log(
        '正在安装 npm 包，如果安装缓慢，亦可手动执行 ' +
          this.projectConfig.cmder +
          ' install 命令...',
      );

      shell.exec(this.projectConfig.cmder + ' install', { silent: true });

      console.log('安装完成!');
    }
  }

  end() {
    if (this.projectConfig.isDev) {
      console.log('--end--');
    }
  }
}

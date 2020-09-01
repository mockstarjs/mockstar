import path from 'path';
import Generator from 'yeoman-generator';
import shell from 'shelljs';
import fse from 'fs-extra';
import walkSync from 'walk-sync';

import BusinessProject from './BusinessProject';

import initMocker from '../../mocker';
import pkgInfo from "../../pkg";

export default class extends Generator {
  businessProject: BusinessProject;

  constructor(args: string | string[], options: Record<string, unknown>) {
    super(args, options);

    // 配置参数
    this.businessProject = new BusinessProject(this.options.projectOpts);
  }

  /**
   * Show template basic message.
   */
  initializing() {
    if (this.businessProject.isDev) {
      console.log('--initializing--', this.businessProject);
    }

    console.log();
    console.log(`${pkgInfo.name} v${pkgInfo.version} init project...`);
    console.log();
  }

  validate() {
    if (this.businessProject.isDev) {
      console.log('--validate--');
    }

    if (
      !(this.businessProject.isDev || this.businessProject.force) &&
      fse.pathExistsSync(path.join(this.businessProject.parentPath, this.businessProject.name))
    ) {
      // 如果当前路径下已经存在了，则需要进行提示，避免覆盖
      return Promise.reject(`当前目录下已经存在名字为 ${this.businessProject.name} 的文件夹了`);
    }

    return Promise.resolve();
  }

  /**
   * Generator project files.
   */
  writing() {
    const { parentPath, name } = this.businessProject;

    const _copyTemplates = () => {
      const folderPath = path.join(parentPath, name);

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
              businessProject: this.businessProject,
            },
          );
        } else {
          this.fs.copy(this.templatePath(curFile), this.destinationPath(curFile));
        }
      });

      // 增加一个简单的 mocker 即可
      const demoMockerName = 'demo_cgi';

      return initMocker({
        isDev: this.businessProject.isDev,
        force: this.businessProject.force,
        parentPath: path.join(this.destinationPath(), './mock_server'),
        isInitReadme: true,
        config: {
          name: demoMockerName,
          route: '/cgi-bin/a/b/' + demoMockerName,
          method: 'GET',
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
    if (this.businessProject.isDev) {
      console.log('--install--');
    }

    if (this.businessProject.autoInstall) {
      console.log(
        `正在安装 npm 包，如果安装缓慢，亦可进入到 ${this.destinationPath()} 目录下手动执行 ${this.businessProject.cmder} install 命令...`
      );

      const shellExecArgs = [
        this.businessProject.cmder,
        'install',
        '--save',
        '--save-exact',
        '--loglevel',
        'error',
      ];

      shell.exec(shellExecArgs.join(' '), {
        silent: false,
        cwd: this.destinationPath()
      });

      // yeoman 原生方法
      // this.installDependencies({ npm: true });
    }
  }

  end() {
    if (this.businessProject.isDev) {
      console.log('--end--');
    }
  }
}

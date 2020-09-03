import path from 'path';
import yeoman from 'yeoman-environment';
import { mockstarCliPackage, mockstarPackage } from '../pkg';

export interface PkgVersion {
  mockstar?: string;
  'mockstar-cli'?: string;
}

export interface InitProjectOpts {
  parentPath: string;
  isDev?: boolean;
  force?: boolean;
  autoInstall?: boolean;
  pkgVersion?: PkgVersion;
  name?: string;
  port?: number;
  cmder?: string;
  readmeDesc?: string
}

/**
 * 初始化一个 project
 */
export default async function initProject(opts: InitProjectOpts) {
  // generator 的名字
  const name = 'project';

  // 依赖包的版本号
  opts.pkgVersion = Object.assign({
      [mockstarPackage.name]: `^${mockstarPackage.version}`,
      [mockstarCliPackage.name]: `^${mockstarCliPackage.version}`,
    },
    opts.pkgVersion,
  );

  // generator 的目录
  const generatorPath = path.join(__dirname, './generator');

  // 创建一个新的环境
  // 注意必须在这里每次都创建，否则会在某些情况下validate失败之后，无法重现执行脚手架的问题
  const yeomanEnv = yeoman.createEnv();

  // 注册 yeoman 插件
  yeomanEnv.register(require.resolve(generatorPath), name);

  // 运行脚手架
  return new Promise((resolve, reject) => {
    // 可以通过透传额外参数到 generator 中，然后通过 this.options 就能够取到传递过去的值
    yeomanEnv.run(
      name,
      {
        projectOpts: opts,
        force: opts.force
      },
      err => {
        // console.log('=====end===', err);
        // 这里的 yeoResult 即 generator 的 this 对象，例如可以通过 result.destinationPath() 获得生成的地址
        if (err) {
          console.error('yeoman generator err', generatorPath, err);
          reject(err);
        } else {
          resolve();
        }
      },
    );
  });
}

export function getProjectGeneratorTemplatesRoot(): string {
  return path.join(__dirname, './generator/templates');
}

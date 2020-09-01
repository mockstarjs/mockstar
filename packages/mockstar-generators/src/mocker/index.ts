import path from 'path';
import yeoman from 'yeoman-environment';

const yeomanEnv = yeoman.createEnv();

export interface InitMockerOpts {
  parentPath: string;
  config: MockerConfig;
  isDev?: boolean;
  force?: boolean;
  isInitReadme?: boolean;
  debugMockModuleJsonData?: Record<string, unknown>;
}

export interface MockerConfig {
  name: string;
  route: string;
  method: string;
}

/**
 * 初始化一个 mocker
 */
export default function initMocker(opts: InitMockerOpts) {
  // generator 的名字
  const name = 'mocker';

  // generator 的目录
  const generatorPath = path.join(__dirname, './generator');

  // 注册 yeoman 插件
  yeomanEnv.register(require.resolve(generatorPath), name);

  // 运行脚手架
  return new Promise((resolve, reject) => {
    // 可以通过透传额外参数到 generator 中，然后通过 this.options 就能够取到传递过去的值
    yeomanEnv.run(
      name,
      {
        mockerOpts: opts,
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

export function getMockerGeneratorTemplatesRoot(): string {
  return path.join(__dirname, './generator/templates');
}

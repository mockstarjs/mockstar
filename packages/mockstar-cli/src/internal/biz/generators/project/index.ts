import path from 'path';
import inquirer from 'inquirer';
import fs from 'fs-extra';
import {initProject} from 'mockstar-generators';

export default function (
  opts: {cwd: string; isDev: boolean},
  callback: (status: boolean, err?: Error) => void,
) {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'projectName',
        message: '请输入项目名称，只能够输入英文、数字和、- 及 _ ',
        default: 'mockstar-app',
        validate: projectName => {
          if (!projectName) {
            return '项目名称不能为空';
          }

          // 默认情况下是在当前路径下新建以 projectName 为名字的文件夹，然后再进入其中生成代码。
          // 但如果当前路径下已经存在了，则需要进行提示，避免覆盖
          if (!opts.isDev && fs.pathExistsSync(path.join(opts.cwd, projectName))) {
            return `当前目录下已经存在名字为 ${projectName} 的文件夹了`;
          }

          return true;
        },
      },
    ])
    .then(answers => {
      const params = Object.assign({}, opts, {
        name: answers.projectName,
        parentPath: opts.cwd,
      });

      initProject(params as any)
        .then(() => {
          callback(true);
        })
        .catch(err => {
          console.log(err);
          callback(false, err);
        });
    });
}

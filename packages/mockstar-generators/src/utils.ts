import https from 'https';
import { execSync } from 'child_process';

/**
 * 通过 https 请求来 获得 npm 包的最新版本
 * @return {Promise<string>}
 */
function checkForLatestVersion(packageName: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https
      .get(
        'https://registry.npmjs.org/-/package/' + packageName + '/dist-tags',
        res => {
          if (res.statusCode === 200) {
            let body = '';
            res.on('data', data => (body += data));
            res.on('end', () => {
              resolve(JSON.parse(body).latest);
            });
          } else {
            reject();
          }
        },
      )
      .on('error', () => {
        reject();
      });
  });
}

/**
 * 获得 npm 包的最新版本，例如 1.2.3
 * @return {Promise<string|null>}
 */
export function getLatestVersion(packageName: string): Promise<string | null> {
  // We first check the registry directly via the API, and if that fails, we try
  // the slower `npm view [package] version` command.
  //
  // This is important for users in environments where direct access to npm is
  // blocked by a firewall, and packages are provided exclusively via a private
  // registry.
  return checkForLatestVersion(packageName)
    .catch(() => {
      try {
        return execSync(`npm view ${packageName} version`)
          .toString()
          .trim();
      } catch (e) {
        return null;
      }
    });
}

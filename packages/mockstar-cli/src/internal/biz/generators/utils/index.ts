import path from 'path';
import urlParse from 'url-parse';
// @ts-ignore
import fsHandler from 'fs-handler';

/**
 * 获得某个路径下的所有 mock_server 目录
 * @param {String} rootPath 根目录
 * @return {Array}
 */
export function getMockServerPathList(rootPath: string) {
  const list: string[] = [];

  fsHandler.search.getAll(rootPath, { globs: ['**/mockstar.config.js'] }).forEach((item: any) => {
    const opts = require(path.join(item.basePath, item.relativePath));

    list.push(opts.mockServerPath || path.join(opts.rootPath, 'src'));
  });

  return list;
}

export function getMockerNameFromURL(url: string) {
  const urlParseResult = urlParse(url);

  return urlParseResult.pathname
    .split('/')
    .pop()
    ?.replace(/[\/|.]/g, '_');
}

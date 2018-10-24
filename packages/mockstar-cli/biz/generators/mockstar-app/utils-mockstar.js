const path = require('path');
const fsHandler = require('fs-handler');

function getMockServerPathList(rootPath) {
    let list = [];

    fsHandler.search.getAll(rootPath, { globs: ['**/mockstar.config.js'] }).forEach((item) => {
        let opts = require(path.join(item.basePath, item.relativePath));

        list.push(opts.mockServerPath || path.join(opts.rootPath, 'mock_server'));
    });

    return list;
}

// console.log(getMockServerPathList('/Users/helinjiang/tmp'));
// console.log(getMockServerPathList('/Users/helinjiang/tmp/mockstar-app'));

module.exports = {
    getMockServerPathList: getMockServerPathList
};
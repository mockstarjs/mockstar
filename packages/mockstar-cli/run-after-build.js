const path = require('path');
const fse = require('fs-extra');

fse.copySync(path.join(__dirname, './package.json'), path.join(__dirname, './lib/pkg.json'));

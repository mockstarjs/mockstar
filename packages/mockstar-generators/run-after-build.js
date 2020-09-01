const path = require('path');
const fse = require('fs-extra');

(() => {
  try {
    fse.copySync('./src/project/generator/templates', './lib/project/generator/templates');
    fse.copySync('./src/mocker/generator/templates', './lib/mocker/generator/templates');
    fse.copySync(path.join(__dirname, './package.json'), path.join(__dirname, './lib/pkg.json'));
  } catch (err) {
    console.log(err);
  }
})();

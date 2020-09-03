const path = require('path');
const fse = require('fs-extra');

(() => {
  try {
    fse.copySync('./src/project/generator/templates', './lib/project/generator/templates');
    fse.copySync('./src/mocker/generator/templates', './lib/mocker/generator/templates');

    fse.copySync(path.join(__dirname, './package.json'), path.join(__dirname, './lib/package-file/mockstar-generators.json'));
    fse.copySync(path.join(__dirname, '../mockstar/package.json'), path.join(__dirname, './lib/package-file/mockstar.json'));
    fse.copySync(path.join(__dirname, '../mockstar-cli/package.json'), path.join(__dirname, './lib/package-file/mockstar-cli.json'));
  } catch (err) {
    console.log(err);
  }
})();

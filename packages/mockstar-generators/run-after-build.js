const fse = require('fs-extra');

(() => {
  try {
    fse.copySync('./src/project/generator/templates', './lib/project/generator/templates');
    fse.copySync('./src/mocker/generator/templates', './lib/mocker/generator/templates');
  } catch (err) {
    console.log(err);
  }
})();

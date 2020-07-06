const {execSync} = require('child_process');
const fs = require('fs-extra');

const build = () => {
  try {
    execSync('tsc -d');
    fs.copySync('./src/project/generator/templates', './lib/project/generator/templates');
    fs.copySync('./src/mocker/generator/templates', './lib/mocker/generator/templates');
  } catch (err) {
    console.log(err.stdout.toString());
  }
};

build();

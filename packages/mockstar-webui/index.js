const path = require('path');

function getStaticDir() {
  return path.join(__dirname, './build');
}

function getIndexHtmlPath() {
  return path.join(__dirname, './build/index.html');
}

module.exports = {
  getStaticDir,
  getIndexHtmlPath,
};

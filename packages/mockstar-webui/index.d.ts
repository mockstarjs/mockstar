import path from 'path';

function getStaticDir(): string {
  return path.join(__dirname, './build');
}

function getIndexHtmlPath(): string {
  return path.join(__dirname, './build/index.html');
}

export { getStaticDir, getIndexHtmlPath };

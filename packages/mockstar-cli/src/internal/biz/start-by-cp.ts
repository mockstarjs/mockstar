import { startServer } from './local-server';

let configOpts;

try {
  configOpts = JSON.parse(decodeURIComponent(process.argv[3]));
} catch (e) {
  throw e;
}

startServer(configOpts, () => {
  console.log('local server start success!');
});

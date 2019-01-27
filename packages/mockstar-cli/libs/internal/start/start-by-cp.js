const localServer = require('../../../biz/local-server');

let configOpts;

try {
    configOpts = JSON.parse(decodeURIComponent(process.argv[3]));
} catch (e) {
    throw e;
}

localServer.startServer(configOpts, () => {
    console.log('local server start success!');
});

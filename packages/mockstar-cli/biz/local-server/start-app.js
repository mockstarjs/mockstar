const mockstarLocalServer = require('mockstar-local-server');

// console.log('==', process.argv);

let configOpts;

try {
    configOpts = JSON.parse(process.argv[2]);
} catch (e) {
    throw e;
}

mockstarLocalServer.startServer(configOpts, (isSuccess, data) => {

});
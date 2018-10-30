const run = require('./run');

// console.log('==', process.argv);

let configOpts;

try {
    configOpts = JSON.parse(process.argv[2]);
} catch (e) {
    throw e;
}

run(configOpts);
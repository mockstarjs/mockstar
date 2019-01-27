'use strict';

const yaml = require('js-yaml');
const fse = require('fs-extra');
const fs = require('fs');

// https://github.com/nodeca/js-yaml#api
// Get document, or throw exception on error
function parseYaml(filePath) {
    let config;

    try {
        config = yaml.safeLoad(fs.readFileSync(filePath, 'utf8'));
    } catch (e) {
        console.log(e);
    }

    return config;
}

function safeDump(obj, filePath) {
    let doc;

    try {
        doc = yaml.safeDump(obj, {
            'styles': {
                '!!null': 'canonical' // dump null as ~
            },
            'sortKeys': true        // sort object keys
        });
    } catch (e) {
        console.log(e);
    }

    return fse.outputFileSync(filePath, doc, 'utf-8');
}

exports.parseYaml = parseYaml;
exports.safeDump = safeDump;

const path = require('path');
const request = require('superagent');
const { expect } = require('chai');
const testServer = require('../data/test-sever');

describe('plugin of xhr', () => {
    let port;
    let pid;
    let cgiBase;

    before(function () {
        return testServer.start(path.join(__dirname, '../../bin/mockstar'), [
            `--config=${path.join(__dirname, '../data/demo_01/mockstar.config.js')}`
        ])
            .then((data) => {
                // console.log('----', data);
                pid = data.pid;
                port = data.port;
                cgiBase = `http://localhost:${port}`;

                return data;
            });
    });

    after(function () {
        testServer.stop(pid);
    });

    describe('return active module result', () => {
        let data;

        before(function () {
            return request
                .get(cgiBase + '/cgi-bin/a/b/demo_03')
                .then((response) => {
                    data = JSON.parse(response.res.text);
                    // console.log(data);
                });
        });

        it('should return correct data', () => {
            expect(data).to.eql({
                'retcode': 0,
                'result': {
                    'result': 1,
                    'other': 'demo_03_other'
                }
            });
        });
    });

    describe('return target mock module result', () => {
        let data;

        before(function () {
            return request
                .get(cgiBase + '/cgi-bin/a/b/demo_03?_m_target=success_2')
                .then((response) => {
                    data = JSON.parse(response.res.text);
                    // console.log(data);
                });
        });

        it('should return correct data', () => {
            expect(data).to.eql({
                'retcode': 0,
                'result': {
                    'result': 2,
                    'other': 'demo_03_other'
                }
            });
        });
    });
});
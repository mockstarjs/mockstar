const path = require('path');
const request = require('superagent');
const fse = require('fs-extra');
const { expect } = require('chai');
const testServer = require('../data/test-sever');
const mockstar = require('mockstar');

describe('plugin of xhr', () => {
    let port;
    let cgiBase;

    before(function () {
        fse.removeSync(path.join(__dirname, '../data/plugin-xhr-test/build'));

        return testServer.start(require(path.join(__dirname, '../data/plugin-xhr-test/mockstar.config.js')))
            .then((data) => {
                // console.log('----', data);
                port = data.port;
                cgiBase = `http://localhost:${port}`;

                return data;
            });
    });

    after(function () {
        fse.removeSync(path.join(__dirname, '../data/plugin-xhr-test/build'));
        testServer.stop();
    });

    describe('get: return active module result', () => {
        let data;

        before(function () {
            return request
                .get(cgiBase + '/cgi-bin/a/b/demo_02')
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
                    'other': 'other'
                }
            });
        });
    });

    describe('get: return target mock module result', () => {
        let data;

        before(function () {
            return request
                .get(cgiBase + '/cgi-bin/a/b/demo_02?_ms_target=success_4')
                .then((response) => {
                    data = JSON.parse(response.res.text);
                    // console.log(data);
                });
        });

        it('should return correct data', () => {
            expect(data).to.equal(4);
        });
    });

    describe('get: return target mock module result with params', () => {
        let data;

        before(function () {
            return request
                .get(cgiBase + '/cgi-bin/a/b/demo_02?_ms_target=success_4&a=88')
                .then((response) => {
                    data = JSON.parse(response.res.text);
                    // console.log(data);
                });
        });

        it('should return correct data', () => {
            expect(data).to.equal('from_param_88');
        });
    });

    describe('get: return target mock module result with extra of string by cookie', () => {
        let data;

        before(function () {
            let tmpMq = new mockstar.MockStarQuery();
            tmpMq.addOne('demo_02_renamed', 'success_4', false, 'I am extra by cookie');
            return request
                .get(cgiBase + '/cgi-bin/a/b/demo_02')
                .set('cookie', tmpMq.getCookieString())
                .then((response) => {
                    data = JSON.parse(response.res.text);
                    // console.log(data);
                });
        });

        it('should return correct data', () => {
            expect(data).to.equal('_ms_extra_I am extra by cookie');
        });
    });

    describe('get: return target mock module result with extra of object by cookie', () => {
        let data;

        before(function () {
            let tmpMq = new mockstar.MockStarQuery();
            tmpMq.addOne('demo_02_renamed', 'success_4', false, { name: 'I am extra by cookie' });
            return request
                .get(cgiBase + '/cgi-bin/a/b/demo_02')
                .set('cookie', tmpMq.getCookieString())
                .then((response) => {
                    data = JSON.parse(response.res.text);
                    // console.log(data);
                });
        });

        it('should return correct data', () => {
            expect(data).to.equal('_ms_extra_{"name":"I am extra by cookie"}');
        });
    });

    describe('get: return target mock module result with extra of string by referer', () => {
        let data;

        before(function () {
            let tmpMq = new mockstar.MockStarQuery();
            tmpMq.addOne('demo_02_renamed', 'success_4', false, 'I am extra by referer');
            return request
                .get(cgiBase + '/cgi-bin/a/b/demo_02')
                .set('referer', 'https://now.qq.com?' + tmpMq.getQueryString())
                .then((response) => {
                    data = JSON.parse(response.res.text);
                    // console.log(data);
                });
        });

        it('should return correct data', () => {
            expect(data).to.equal('_ms_extra_I am extra by referer');
        });
    });

    describe('get: return target mock module result with extra of string and cookie first', () => {
        let data;

        before(function () {
            let tmpMq1 = new mockstar.MockStarQuery();
            tmpMq1.addOne('demo_02_renamed', 'success_4', false, 'I am extra by cookie');

            let tmpMq2 = new mockstar.MockStarQuery();
            tmpMq2.addOne('demo_02_renamed', 'success_4', false, 'I am extra by referer');

            return request
                .get(cgiBase + '/cgi-bin/a/b/demo_02')
                .set('cookie', tmpMq1.getCookieString())
                .set('referer', 'https://now.qq.com?' + tmpMq2.getQueryString())
                .then((response) => {
                    data = JSON.parse(response.res.text);
                    // console.log(data);
                });
        });

        it('should return correct data', () => {
            expect(data).to.equal('_ms_extra_I am extra by cookie');
        });
    });

    describe('post: return active module result', () => {
        let data;

        before(function () {
            return request
                .post(cgiBase + '/cgi-bin/a/b/demo_03_post')
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
                    'other': 'demo_03_post_other'
                }
            });
        });
    });

    describe('post: return target mock module result', () => {
        let data;

        before(function () {
            return request
                .post(cgiBase + '/cgi-bin/a/b/demo_03_post')
                .send({
                    _ms_target: 'success_2'
                })
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
                    'other': 'demo_03_post_other'
                }
            });
        });
    });

    describe('post: return target mock module result with params', () => {
        let data;

        before(function () {
            return request
                .post(cgiBase + '/cgi-bin/a/b/demo_03_post')
                .send({
                    _ms_target: 'success_2',
                    a: 99
                })
                .then((response) => {
                    data = JSON.parse(response.res.text);
                    // console.log(data);
                });
        });

        it('should return correct data', () => {
            expect(data).to.eql({
                'retcode': 0,
                'result': {
                    'result': 'from_param_99',
                    'other': 'demo_03_post_other'
                }
            });
        });
    });
});
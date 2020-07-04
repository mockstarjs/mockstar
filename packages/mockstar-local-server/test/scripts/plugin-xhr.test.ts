import path from 'path';
// @ts-ignore
import request from 'superagent';
import fse from 'fs-extra';
import {expect} from 'chai';
import {MockStarQuery} from 'mockstar';

// @ts-ignore
import testServer from '../data/test-sever';

describe('plugin of xhr', () => {
  let port;
  let cgiBase: string;

  before(function () {
    fse.removeSync(path.join(__dirname, '../data/plugin-xhr-test/build'));

    return testServer
      .start(require(path.join(__dirname, '../data/plugin-xhr-test/mockstar.config.js')))
      .then((data: {port: number}) => {
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
    let data: any;

    before(function () {
      return request
        .get(cgiBase + '/cgi-bin/a/b/demo_02')
        .then((response: {res: {text: string}}) => {
          data = JSON.parse(response.res.text);
          // console.log(data);
        });
    });

    it('should return correct data', () => {
      expect(data).to.eql({
        retcode: 0,
        result: {
          result: 1,
          other: 'other',
        },
      });
    });
  });

  describe('get: return target mock module result', () => {
    let data: any;

    before(function () {
      return request
        .get(cgiBase + '/cgi-bin/a/b/demo_02?_ms_target=success_4')
        .then((response: {res: {text: string}}) => {
          data = JSON.parse(response.res.text);
          // console.log(data);
        });
    });

    it('should return correct data', () => {
      expect(data).to.equal(4);
    });
  });

  describe('get: return target mock module result with params', () => {
    let data: any;

    before(function () {
      return request
        .get(cgiBase + '/cgi-bin/a/b/demo_02?_ms_target=success_4&a=88')
        .then((response: {res: {text: string}}) => {
          data = JSON.parse(response.res.text);
          // console.log(data);
        });
    });

    it('should return correct data', () => {
      expect(data).to.equal('from_param_88');
    });
  });

  describe('get: return target mock module result with extra of string by cookie', () => {
    let data: any;

    before(function () {
      let tmpMq = new MockStarQuery();
      tmpMq.addOne('demo_02_renamed', 'success_4', false, 'I am extra by cookie');
      return request
        .get(cgiBase + '/cgi-bin/a/b/demo_02')
        .set('cookie', tmpMq.getCookieString())
        .then((response: {res: {text: string}}) => {
          data = JSON.parse(response.res.text);
          // console.log(data);
        });
    });

    it('should return correct data', () => {
      expect(data).to.equal('_ms_extra_I am extra by cookie');
    });
  });

  describe('get: return target mock module result with extra of object by cookie', () => {
    let data: any;

    before(function () {
      let tmpMq = new MockStarQuery();
      tmpMq.addOne('demo_02_renamed', 'success_4', false, {name: 'I am extra by cookie'});
      return request
        .get(cgiBase + '/cgi-bin/a/b/demo_02')
        .set('cookie', tmpMq.getCookieString())
        .then((response: {res: {text: string}}) => {
          data = JSON.parse(response.res.text);
          // console.log(data);
        });
    });

    it('should return correct data', () => {
      expect(data).to.equal('_ms_extra_{"name":"I am extra by cookie"}');
    });
  });

  describe('get: return target mock module result with extra of string by referer', () => {
    let data: any;

    before(function () {
      let tmpMq = new MockStarQuery();
      tmpMq.addOne('demo_02_renamed', 'success_4', false, 'I am extra by referer');
      return request
        .get(cgiBase + '/cgi-bin/a/b/demo_02')
        .set('referer', 'https://now.qq.com?' + tmpMq.getQueryString())
        .then((response: {res: {text: string}}) => {
          data = JSON.parse(response.res.text);
          // console.log(data);
        });
    });

    it('should return correct data', () => {
      expect(data).to.equal('_ms_extra_I am extra by referer');
    });
  });

  describe('get: return target mock module result with extra of string and cookie first', () => {
    let data: any;

    before(function () {
      let tmpMq1 = new MockStarQuery();
      tmpMq1.addOne('demo_02_renamed', 'success_4', false, 'I am extra by cookie');

      let tmpMq2 = new MockStarQuery();
      tmpMq2.addOne('demo_02_renamed', 'success_4', false, 'I am extra by referer');

      return request
        .get(cgiBase + '/cgi-bin/a/b/demo_02')
        .set('cookie', tmpMq1.getCookieString())
        .set('referer', 'https://now.qq.com?' + tmpMq2.getQueryString())
        .then((response: {res: {text: string}}) => {
          data = JSON.parse(response.res.text);
          // console.log(data);
        });
    });

    it('should return correct data', () => {
      expect(data).to.equal('_ms_extra_I am extra by cookie');
    });
  });

  describe('post: return active module result', () => {
    let data: any;

    before(function () {
      return request
        .post(cgiBase + '/cgi-bin/a/b/demo_03_post')
        .then((response: {res: {text: string}}) => {
          data = JSON.parse(response.res.text);
          // console.log(data);
        });
    });

    it('should return correct data', () => {
      expect(data).to.eql({
        retcode: 0,
        result: {
          result: 1,
          other: 'demo_03_post_other',
        },
      });
    });
  });

  describe('post: return target mock module result', () => {
    let data: any;

    before(function () {
      return request
        .post(cgiBase + '/cgi-bin/a/b/demo_03_post')
        .send({
          _ms_target: 'success_2',
        })
        .then((response: {res: {text: string}}) => {
          data = JSON.parse(response.res.text);
          // console.log(data);
        });
    });

    it('should return correct data', () => {
      expect(data).to.eql({
        retcode: 0,
        result: {
          result: 2,
          other: 'demo_03_post_other',
        },
      });
    });
  });

  describe('post: return target mock module result with params', () => {
    let data: any;

    before(function () {
      return request
        .post(cgiBase + '/cgi-bin/a/b/demo_03_post')
        .send({
          _ms_target: 'success_2',
          a: 99,
        })
        .then((response: {res: {text: string}}) => {
          data = JSON.parse(response.res.text);
          // console.log(data);
        });
    });

    it('should return correct data', () => {
      expect(data).to.eql({
        retcode: 0,
        result: {
          result: 'from_param_99',
          other: 'demo_03_post_other',
        },
      });
    });
  });
});

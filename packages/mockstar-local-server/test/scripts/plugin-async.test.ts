import path from 'path';
import fse from 'fs-extra';
import {expect} from 'chai';
import {AsyncClient} from 'mockstar-client';

// @ts-ignore
import testServer from '../data/test-sever';

describe('plugin of async', () => {
  let port;
  let cgiBase: string;

  before(function () {
    fse.removeSync(path.join(__dirname, '../data/plugin-async-test/build'));

    return testServer
      .start(require(path.join(__dirname, '../data/plugin-async-test/mockstar.config.js')))
      .then((data: {port: any}) => {
        // console.log('----', data);
        port = data.port;
        cgiBase = `http://localhost:${port}`;

        return data;
      });
  });

  after(function () {
    fse.removeSync(path.join(__dirname, '../data/plugin-async-test/build'));
    testServer.stop();
  });

  describe('return active module result', () => {
    let data: unknown;

    before(function () {
      let asyncClient = new AsyncClient(cgiBase);

      let actualURL = '/async/a/b/async_01';
      let query = null;

      // @ts-ignore
      return asyncClient.request(actualURL, query).then(response => {
        data = response;
      });
    });

    it('should return correct data', () => {
      expect(data).to.eql({
        errCode: 100000,
        errMsg: 'Something wrong in async_01 error.json',
      });
    });
  });

  describe('return target mock module result', () => {
    let data: unknown;

    before(function () {
      let asyncClient = new AsyncClient(cgiBase);

      let actualURL = '/async/a/b/async_01';
      let query = {_ms_target: 'success'};

      return asyncClient.request(actualURL, query).then(response => {
        data = response;
      });
    });

    it('should return correct data', () => {
      expect(data).to.eql({
        errCode: 0,
        result: {
          description: 'async_01 success.json',
        },
      });
    });
  });
});

import path from 'path';
import 'mocha';
import { expect } from 'chai';

import initMocker, { getMockerGeneratorTemplatesRoot } from '../../../src/mocker';

describe('./mocker/index.ts', () => {
  describe('initMocker()', () => {
    it('initMocker should be a function', () => {
      expect(initMocker).to.be.an('function');
    });

    it('check iAmXHRRequestGet', async () => {
      await initMocker({
        isDev: false,
        parentPath: path.join(__dirname, '../../data/fixtures/mockers'),
        isInitReadme: true,
        config: {
          name: 'i-am-xhr-request-get',
          method: 'get',
          route: '/cgi-bin/i-am-xhr-request-get',
        },
        debugMockModuleJsonData: {
          retcode: 0,
          result: {
            uid: 99999,
            type: 9,
            description: '我是 debug',
            other_msg: '仅作为临时调试用，建议按照不同的场景构造不同的 mock module!',
          },
        },
      });
      expect(initMocker).to.be.an('function');
    });
  });

  describe('getMockerGeneratorTemplatesRoot()', () => {
    it('getMockerGeneratorTemplatesRoot should be a function', () => {
      expect(getMockerGeneratorTemplatesRoot).to.be.an('function');
    });

    it('getMockerGeneratorTemplatesRoot() should be correct', () => {
      expect(getMockerGeneratorTemplatesRoot()).to.be.equal(
        path.join(__dirname, '../../../src/mocker/generator/templates'),
      );
    });
  });
});

import {expect} from 'chai';

import MockStarQuery from '../../../src/model/MockStarQuery';

describe('./mocker/MockStarQuery.ts', () => {
  describe('list is empty', () => {
    let mockStarQuery: MockStarQuery;

    before(() => {
      mockStarQuery = new MockStarQuery();
    });

    it('check getString() ', () => {
      expect(mockStarQuery.getString()).to.equal('[]');
    });

    it('check getQueryString() ', () => {
      expect(mockStarQuery.getQueryString()).to.equal('_ms_=%5B%5D');
    });

    it('check getCookieString() ', () => {
      expect(mockStarQuery.getCookieString()).to.equal('_ms_=[]');
    });

    it('check appendToUrl() ', () => {
      // @ts-ignore
      expect(mockStarQuery.appendToUrl()).to.be.undefined;
    });

    it('check appendToUrl(https://now.qq.com) ', () => {
      expect(mockStarQuery.appendToUrl('https://now.qq.com')).to.equal(
        'https://now.qq.com?_ms_=%5B%5D',
      );
    });

    it('check appendToUrl(https://now.qq.com?from=mockstar) ', () => {
      expect(mockStarQuery.appendToUrl('https://now.qq.com?from=mockstar')).to.equal(
        'https://now.qq.com?from=mockstar&_ms_=%5B%5D',
      );
    });
  });

  describe('list is exist one item', () => {
    let mockStarQuery: MockStarQuery;

    before(() => {
      mockStarQuery = new MockStarQuery();

      mockStarQuery.addOne('mockerName01', 'mockModuleName01');
    });

    it('check getString() ', () => {
      expect(mockStarQuery.getString()).to.equal(
        '[{"_ms_name":"mockerName01","_ms_target":"mockModuleName01","_ms_disable":false}]',
      );
    });

    it('check getQueryString() ', () => {
      expect(mockStarQuery.getQueryString()).to.equal(
        '_ms_=%5B%7B%22_ms_name%22%3A%22mockerName01%22%2C%22_ms_target%22%3A%22mockModuleName01%22%2C%22_ms_disable%22%3Afalse%7D%5D',
      );
    });

    it('check getCookieString() ', () => {
      expect(mockStarQuery.getCookieString()).to.equal(
        '_ms_=[{"_ms_name":"mockerName01","_ms_target":"mockModuleName01","_ms_disable":false}]',
      );
    });

    it('check appendToUrl() ', () => {
      // @ts-ignore
      expect(mockStarQuery.appendToUrl()).to.be.undefined;
    });

    it('check appendToUrl(https://now.qq.com) ', () => {
      expect(mockStarQuery.appendToUrl('https://now.qq.com')).to.equal(
        'https://now.qq.com?_ms_=%5B%7B%22_ms_name%22%3A%22mockerName01%22%2C%22_ms_target%22%3A%22mockModuleName01%22%2C%22_ms_disable%22%3Afalse%7D%5D',
      );
    });

    it('check appendToUrl(https://now.qq.com?from=mockstar) ', () => {
      expect(mockStarQuery.appendToUrl('https://now.qq.com?from=mockstar')).to.equal(
        'https://now.qq.com?from=mockstar&_ms_=%5B%7B%22_ms_name%22%3A%22mockerName01%22%2C%22_ms_target%22%3A%22mockModuleName01%22%2C%22_ms_disable%22%3Afalse%7D%5D',
      );
    });
  });

  describe('list is exist three item', () => {
    let mockStarQuery: MockStarQuery;

    before(() => {
      mockStarQuery = new MockStarQuery();

      mockStarQuery.addOne('mockerName01', 'mockModuleName01');
      mockStarQuery.addOne('mockerName02', 'mockModuleName02', true);
      mockStarQuery.addOne('mockerName02', 'mockModuleName02', false, {
        name: 'mockstar',
        description: '快速搭建 mock server 的工具',
      });
    });

    it('check getString() ', () => {
      expect(mockStarQuery.getString()).to.equal(
        '[{"_ms_name":"mockerName01","_ms_target":"mockModuleName01","_ms_disable":false},{"_ms_name":"mockerName02","_ms_target":"mockModuleName02","_ms_disable":true},{"_ms_name":"mockerName02","_ms_target":"mockModuleName02","_ms_disable":false,"_ms_extra":{"name":"mockstar","description":"快速搭建 mock server 的工具"}}]',
      );
    });

    it('check getQueryString() ', () => {
      expect(mockStarQuery.getQueryString()).to.equal(
        '_ms_=%5B%7B%22_ms_name%22%3A%22mockerName01%22%2C%22_ms_target%22%3A%22mockModuleName01%22%2C%22_ms_disable%22%3Afalse%7D%2C%7B%22_ms_name%22%3A%22mockerName02%22%2C%22_ms_target%22%3A%22mockModuleName02%22%2C%22_ms_disable%22%3Atrue%7D%2C%7B%22_ms_name%22%3A%22mockerName02%22%2C%22_ms_target%22%3A%22mockModuleName02%22%2C%22_ms_disable%22%3Afalse%2C%22_ms_extra%22%3A%7B%22name%22%3A%22mockstar%22%2C%22description%22%3A%22%E5%BF%AB%E9%80%9F%E6%90%AD%E5%BB%BA%20mock%20server%20%E7%9A%84%E5%B7%A5%E5%85%B7%22%7D%7D%5D',
      );
    });

    it('check getCookieString() ', () => {
      expect(mockStarQuery.getCookieString()).to.equal(
        '_ms_=[{"_ms_name":"mockerName01","_ms_target":"mockModuleName01","_ms_disable":false},{"_ms_name":"mockerName02","_ms_target":"mockModuleName02","_ms_disable":true},{"_ms_name":"mockerName02","_ms_target":"mockModuleName02","_ms_disable":false,"_ms_extra":{"name":"mockstar","description":"快速搭建 mock server 的工具"}}]',
      );
    });

    it('check appendToUrl() ', () => {
      // @ts-ignore
      expect(mockStarQuery.appendToUrl()).to.be.undefined;
    });

    it('check appendToUrl(https://now.qq.com) ', () => {
      expect(mockStarQuery.appendToUrl('https://now.qq.com')).to.equal(
        'https://now.qq.com?_ms_=%5B%7B%22_ms_name%22%3A%22mockerName01%22%2C%22_ms_target%22%3A%22mockModuleName01%22%2C%22_ms_disable%22%3Afalse%7D%2C%7B%22_ms_name%22%3A%22mockerName02%22%2C%22_ms_target%22%3A%22mockModuleName02%22%2C%22_ms_disable%22%3Atrue%7D%2C%7B%22_ms_name%22%3A%22mockerName02%22%2C%22_ms_target%22%3A%22mockModuleName02%22%2C%22_ms_disable%22%3Afalse%2C%22_ms_extra%22%3A%7B%22name%22%3A%22mockstar%22%2C%22description%22%3A%22%E5%BF%AB%E9%80%9F%E6%90%AD%E5%BB%BA%20mock%20server%20%E7%9A%84%E5%B7%A5%E5%85%B7%22%7D%7D%5D',
      );
    });

    it('check appendToUrl(https://now.qq.com?from=mockstar) ', () => {
      expect(mockStarQuery.appendToUrl('https://now.qq.com?from=mockstar')).to.equal(
        'https://now.qq.com?from=mockstar&_ms_=%5B%7B%22_ms_name%22%3A%22mockerName01%22%2C%22_ms_target%22%3A%22mockModuleName01%22%2C%22_ms_disable%22%3Afalse%7D%2C%7B%22_ms_name%22%3A%22mockerName02%22%2C%22_ms_target%22%3A%22mockModuleName02%22%2C%22_ms_disable%22%3Atrue%7D%2C%7B%22_ms_name%22%3A%22mockerName02%22%2C%22_ms_target%22%3A%22mockModuleName02%22%2C%22_ms_disable%22%3Afalse%2C%22_ms_extra%22%3A%7B%22name%22%3A%22mockstar%22%2C%22description%22%3A%22%E5%BF%AB%E9%80%9F%E6%90%AD%E5%BB%BA%20mock%20server%20%E7%9A%84%E5%B7%A5%E5%85%B7%22%7D%7D%5D',
      );
    });
  });
});

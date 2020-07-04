import {expect} from 'chai';

import {getQueryItemsFromCookieMap, getQueryItemsFromReferer, getQueryItem} from '../../src/util';
import MockStarQuery from '../../src/model/MockStarQuery';
import MockStarQueryItem from '../../src/model/MockStarQueryItem';

describe('./util.js', () => {
  let mockStarQuery;

  before(() => {
    mockStarQuery = new MockStarQuery();
    mockStarQuery.addOne('mockerName1', 'mockModuleName1');
    mockStarQuery.addOne('mockerName2', 'mockModuleName2', true);
    mockStarQuery.addOne('mockerName3', 'mockModuleName3', true, 1);
    mockStarQuery.addOne('mockerName4', 'mockModuleName4', true, {a: 1});
  });

  describe('getQueryItemsFromCookieMap', () => {
    it('cookieMap is {} should return []', () => {
      let cookies = {};
      expect(getQueryItemsFromCookieMap(cookies)).to.be.a('array').that.is.empty;
    });

    it('cookieMap is {a:1} should return []', () => {
      let cookies = {a: 1};
      expect(getQueryItemsFromCookieMap(cookies)).to.be.a('array').that.is.empty;
    });

    it('cookieMap is {_ms_:1} should return []', () => {
      let cookies = {_ms_: 1};
      expect(getQueryItemsFromCookieMap(cookies)).to.be.a('array').that.is.empty;
    });

    it('cookieMap is {_ms_:[{},{}]} should return correct', () => {
      let cookies = {_ms_: mockStarQuery.getString()};

      expect(getQueryItemsFromCookieMap(cookies)).to.eql([
        {
          _ms_name: 'mockerName1',
          _ms_target: 'mockModuleName1',
          _ms_disable: false,
        },
        {
          _ms_name: 'mockerName2',
          _ms_target: 'mockModuleName2',
          _ms_disable: true,
        },
        {
          _ms_name: 'mockerName3',
          _ms_target: 'mockModuleName3',
          _ms_disable: true,
          _ms_extra: 1,
        },
        {
          _ms_name: 'mockerName4',
          _ms_target: 'mockModuleName4',
          _ms_disable: true,
          _ms_extra: {a: 1},
        },
      ]);
    });
  });

  describe('getQueryItemsFromReferer', () => {
    it('referer is undefined should return []', () => {
      let referer;
      expect(getQueryItemsFromReferer(referer)).to.be.a('array').that.is.empty;
    });

    it('referer is other should return []', () => {
      let referer = 'https://now.qq.com';
      expect(getQueryItemsFromReferer(referer)).to.be.a('array').that.is.empty;
    });

    it('referer is error _ms_ should return []', () => {
      let referer = 'https://now.qq.com?_ms_=1';
      expect(getQueryItemsFromReferer(referer)).to.be.a('array').that.is.empty;
    });

    it('referer is ok should return correct', () => {
      let referer = 'https://now.qq.com?' + mockStarQuery.getQueryString();

      expect(getQueryItemsFromReferer(referer)).to.eql([
        {
          _ms_name: 'mockerName1',
          _ms_target: 'mockModuleName1',
          _ms_disable: false,
        },
        {
          _ms_name: 'mockerName2',
          _ms_target: 'mockModuleName2',
          _ms_disable: true,
        },
        {
          _ms_name: 'mockerName3',
          _ms_target: 'mockModuleName3',
          _ms_disable: true,
          _ms_extra: 1,
        },
        {
          _ms_name: 'mockerName4',
          _ms_target: 'mockModuleName4',
          _ms_disable: true,
          _ms_extra: {a: 1},
        },
      ]);
    });
  });

  describe('getQueryItem', () => {
    it('cookies and referer all none should return null', () => {
      let opts;
      expect(getQueryItem('mockerName1', opts)).to.be.null;
    });

    it('cookie is ok should return correct', () => {
      let opts = {
        cookies: {_ms_: mockStarQuery.getString()},
      };

      expect(getQueryItem('mockerName1', opts)).to.eql(
        new MockStarQueryItem({
          _ms_name: 'mockerName1',
          _ms_target: 'mockModuleName1',
          _ms_disable: false,
        }),
      );
    });

    it('referer is ok should return correct', () => {
      let opts = {
        referer: 'https://now.qq.com?' + mockStarQuery.getQueryString(),
      };

      expect(getQueryItem('mockerName1', opts)).to.eql(
        new MockStarQueryItem({
          _ms_name: 'mockerName1',
          _ms_target: 'mockModuleName1',
          _ms_disable: false,
        }),
      );
    });

    it('cookie is first should return correct', () => {
      let tmpMq = new MockStarQuery();
      tmpMq.addOne('mockerName1', 'other');
      let opts = {
        cookies: {_ms_: tmpMq.getString()},
        referer: 'https://now.qq.com?' + mockStarQuery.getQueryString(),
      };

      expect(getQueryItem('mockerName1', opts)).to.eql(
        new MockStarQueryItem({
          _ms_name: 'mockerName1',
          _ms_target: 'other',
          _ms_disable: false,
        }),
      );
    });
  });
});

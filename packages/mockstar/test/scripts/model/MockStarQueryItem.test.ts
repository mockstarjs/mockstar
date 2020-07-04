import {expect} from 'chai';

import MockStarQueryItem from '../../../src/model/MockStarQueryItem';

describe('./model/MockStarQueryItem.ts', () => {
  describe('opts is MockStarQueryItemObj', () => {
    let mockStarQueryItem: MockStarQueryItem;

    before(() => {
      mockStarQueryItem = new MockStarQueryItem({
        _ms_name: 'mockerName',
        _ms_target: 'mockModuleName',
        _ms_disable: false,
        _ms_extra: {},
      });
    });

    it('check obj ', () => {
      expect(mockStarQueryItem).to.eql({
        _ms_name: 'mockerName',
        _ms_target: 'mockModuleName',
        _ms_disable: false,
        _ms_extra: {},
      });
    });

    it('check isDisabled()', () => {
      expect(mockStarQueryItem.isDisabled()).to.be.false;
    });

    it('check isMe(mockerName)', () => {
      expect(mockStarQueryItem.isMe('mockerName')).to.be.true;
    });

    it('check isMe(notExistMockerName)', () => {
      expect(mockStarQueryItem.isMe('notExistMockerName')).to.be.false;
    });
  });

  describe('opts is args', () => {
    let mockStarQueryItem: MockStarQueryItem;

    before(() => {
      mockStarQueryItem = new MockStarQueryItem('mockerName', 'mockModuleName', false, {});
    });

    it('check obj ', () => {
      expect(mockStarQueryItem).to.eql({
        _ms_name: 'mockerName',
        _ms_target: 'mockModuleName',
        _ms_disable: false,
        _ms_extra: {},
      });
    });

    it('check isDisabled()', () => {
      expect(mockStarQueryItem.isDisabled()).to.be.false;
    });

    it('check isMe(mockerName)', () => {
      expect(mockStarQueryItem.isMe('mockerName')).to.be.true;
    });

    it('check isMe(notExistMockerName)', () => {
      expect(mockStarQueryItem.isMe('notExistMockerName')).to.be.false;
    });
  });

  describe('opts only mockerName', () => {
    let mockStarQueryItem: MockStarQueryItem;

    before(() => {
      mockStarQueryItem = new MockStarQueryItem('mockerName');
    });

    it('check obj ', () => {
      expect(mockStarQueryItem).to.eql({
        _ms_name: 'mockerName',
        _ms_target: '',
        _ms_disable: false,
        _ms_extra: undefined,
      });
    });

    it('check isDisabled()', () => {
      expect(mockStarQueryItem.isDisabled()).to.be.false;
    });

    it('check isMe(mockerName)', () => {
      expect(mockStarQueryItem.isMe('mockerName')).to.be.true;
    });

    it('check isMe(notExistMockerName)', () => {
      expect(mockStarQueryItem.isMe('notExistMockerName')).to.be.false;
    });
  });
});

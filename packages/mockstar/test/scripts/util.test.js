const chai = require('chai');
const expect = chai.expect;

const { getQueryItemsFromCookieMap } = require('../../lib/util');
const MockStarQuery = require('../../lib/model/MockStarQuery').default;

describe.only('./util.js', () => {
    let mockStarQuery;

    before(() => {
        mockStarQuery = new MockStarQuery();
        mockStarQuery.addOne('mockerName1', 'mockModuleName1');
        mockStarQuery.addOne('mockerName2', 'mockModuleName2', true);
        mockStarQuery.addOne('mockerName3', 'mockModuleName3', true, 1);
        mockStarQuery.addOne('mockerName4', 'mockModuleName4', true, { a: 1 });
    });

    describe('getQueryItemsFromCookieMap', () => {
        it('cookieMap is {} should return []', () => {
            let cookies = {};
            expect(getQueryItemsFromCookieMap(cookies)).to.be.a('array').that.is.empty;
        });

        it('cookieMap is {a:1} should return []', () => {
            let cookies = { a: 1 };
            expect(getQueryItemsFromCookieMap(cookies)).to.be.a('array').that.is.empty;
        });

        it('cookieMap is {_ms_:1} should return []', () => {
            let cookies = { _ms_: 1 };
            expect(getQueryItemsFromCookieMap(cookies)).to.be.a('array').that.is.empty;
        });

        it('cookieMap is {_ms_:[{},{}]} should return correct', () => {
            let cookies = { _ms_: mockStarQuery.getString() };

            expect(getQueryItemsFromCookieMap(cookies)).to.eql([{
                '_ms_name': 'mockerName1',
                '_ms_target': 'mockModuleName1',
                '_ms_disable': 0
            }, {
                '_ms_name': 'mockerName2',
                '_ms_target': 'mockModuleName2',
                '_ms_disable': 1
            }, {
                '_ms_name': 'mockerName3',
                '_ms_target': 'mockModuleName3',
                '_ms_disable': 1,
                '_ms_extra': 1
            }, {
                '_ms_name': 'mockerName4',
                '_ms_target': 'mockModuleName4',
                '_ms_disable': 1,
                '_ms_extra': { 'a': 1 }
            }]);
        });
    });
});

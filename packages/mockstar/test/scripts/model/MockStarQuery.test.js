const chai = require('chai');
const expect = chai.expect;

const MockStarQuery = require('../../../lib/model/MockStarQuery').default;

describe('./mocker/MockStarQuery.js', () => {
    describe('add two item', () => {
        let mockStarQuery;

        before(() => {
            mockStarQuery = new MockStarQuery();
            mockStarQuery.addOne('mocker1', 'mockModule1');
            mockStarQuery.addOne('mocker2', 'mockModule2');
        });

        it('check getString', () => {
            expect(mockStarQuery.getString()).to.equal('[{"_ms_name":"mocker1","_ms_target":"mockModule1","_ms_disable":0},{"_ms_name":"mocker2","_ms_target":"mockModule2","_ms_disable":0}]');
        });

        it('check getQueryString', () => {
            expect(mockStarQuery.getQueryString()).to.equal('_ms_=[{"_ms_name":"mocker1","_ms_target":"mockModule1","_ms_disable":0},{"_ms_name":"mocker2","_ms_target":"mockModule2","_ms_disable":0}]');
        });

        it('check getCookieString', () => {
            expect(mockStarQuery.getQueryString()).to.equal('_ms_=[{"_ms_name":"mocker1","_ms_target":"mockModule1","_ms_disable":0},{"_ms_name":"mocker2","_ms_target":"mockModule2","_ms_disable":0}]');
        });
    });

    describe('init with mockerMap', () => {
        let mockStarQuery;

        before(() => {
            mockStarQuery = new MockStarQuery({
                'mocker1': 'mockModule1',
                'mocker2': 'mockModule2'
            });
        });

        it('check getString', () => {
            expect(mockStarQuery.getString()).to.equal('[{"_ms_name":"mocker1","_ms_target":"mockModule1","_ms_disable":0},{"_ms_name":"mocker2","_ms_target":"mockModule2","_ms_disable":0}]');
        });

        it('check getQueryString', () => {
            expect(mockStarQuery.getQueryString()).to.equal('_ms_=[{"_ms_name":"mocker1","_ms_target":"mockModule1","_ms_disable":0},{"_ms_name":"mocker2","_ms_target":"mockModule2","_ms_disable":0}]');
        });

        it('check getCookieString', () => {
            expect(mockStarQuery.getQueryString()).to.equal('_ms_=[{"_ms_name":"mocker1","_ms_target":"mockModule1","_ms_disable":0},{"_ms_name":"mocker2","_ms_target":"mockModule2","_ms_disable":0}]');
        });
    });
});


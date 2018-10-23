const chai = require('chai');
const expect = chai.expect;

const MockModuleConfig = require('../../../lib/model/MockModuleConfig').default;

describe.only('./mocker/MockModuleConfig.js', () => {
    describe('check exist-config', () => {
        let mockModuleConfig;

        before(() => {
            mockModuleConfig = new MockModuleConfig('exist-config', require('../../data/fixtures/mock_modules/exist-config/config'));
            // console.log(mockModuleConfig);
        });

        it('should be instanceof MockModuleConfig ', () => {
            expect(mockModuleConfig).to.be.an.instanceof(MockModuleConfig);
        });

        it('should contain some fields', () => {
            expect(mockModuleConfig).to.have.all.keys('name', 'description', 'delay', 'priority', 'match');
        });

        it('should equal correct value', () => {
            expect(mockModuleConfig).to.eql({
                name: 'exist-config',
                description: 'exist-config description',
                priority: 88,
                delay: 10086,
                match: {
                    _ms_target_: 'exist-config',
                    type: 1
                }
            });
        });
    });

    describe('check no-config', () => {
        it('should equal correct value', () => {
            expect(new MockModuleConfig('no-config')).to.eql({
                name: 'no-config',
                description: 'no-config',
                priority: 0,
                delay: 0,
                match: {
                    _ms_target_: 'no-config'
                }
            });
        });
    });
});


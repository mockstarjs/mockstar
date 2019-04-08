const chai = require('chai');
const expect = chai.expect;

const { MS_QUERY_KEY, MS_NAME, MS_TARGET, MS_DISABLE, MS_EXTRA, MS_FROM, MOCK_MODULES, LOCAL_STORE_FILE } = require('../../lib/config');

describe('./config.js', () => {
    it('MS_QUERY_KEY should be _ms_', () => {
        expect(MS_QUERY_KEY).to.equal('_ms_');
    });

    it('MS_NAME should be _ms_name', () => {
        expect(MS_NAME).to.equal('_ms_name');
    });

    it('MS_TARGET should be _ms_target', () => {
        expect(MS_TARGET).to.equal('_ms_target');
    });

    it('MS_DISABLE should be _ms_disable', () => {
        expect(MS_DISABLE).to.equal('_ms_disable');
    });

    it('MS_EXTRA should be _ms_extra', () => {
        expect(MS_EXTRA).to.equal('_ms_extra');
    });

    it('MS_FROM should be _ms_from', () => {
        expect(MS_FROM).to.equal('_ms_from');
    });

    it('LOCAL_STORE_FILE should be db.json', () => {
        expect(LOCAL_STORE_FILE).to.equal('db.json');
    });

    it('MOCK_MODULES should be mock_modules', () => {
        expect(MOCK_MODULES).to.equal('mock_modules');
    });
});

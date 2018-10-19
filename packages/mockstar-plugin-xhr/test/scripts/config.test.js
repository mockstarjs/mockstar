const chai = require('chai');
const expect = chai.expect;

const { XHR_QUERY_KEY, XHR_TARGET } = require('../../lib/config');

describe('./config.js', () => {
    it('XHR_QUERY_KEY should be correct', () => {
        expect(XHR_QUERY_KEY).to.equal('_ms_');
    });

    it('XHR_TARGET should be correct', () => {
        expect(XHR_TARGET).to.equal('_ms_target_');
    });
});

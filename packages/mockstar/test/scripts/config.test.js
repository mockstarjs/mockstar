const chai = require('chai');
const expect = chai.expect;

const { MOCK_MODULES } = require('../../lib/config');

describe('./config.js', () => {
    it('MOCK_MODULES should be correct', () => {
        expect(MOCK_MODULES).to.equal('mock_modules');
    });
});

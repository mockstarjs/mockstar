import {expect} from 'chai';

import MockModule from '../../../src/model/MockModule';
import MockModuleConfig from '../../../src/model/MockModuleConfig';

describe('./model/MockModule.ts', () => {
  describe('check json-file.json', () => {
    let mockModule: MockModule;

    before(() => {
      mockModule = new MockModule(
        'json-file',
        require('../../data/fixtures/mock_modules/json-file'),
      );
      // console.log(mockModule);
    });

    it('should be instanceof MockModule ', () => {
      expect(mockModule).to.be.an.instanceof(MockModule);
    });

    it('should contain some fields', () => {
      expect(mockModule).to.have.all.keys('name', 'module', 'config');
    });

    it('mockModule.config is instanceof MockModuleConfig ', () => {
      expect(mockModule.config).to.be.an.instanceof(MockModuleConfig);
    });

    it('should return correct value', () => {
      return mockModule.getResult().then((data: any) => {
        expect(data).to.eql({
          name: 'json-file.json',
          age: 16,
        });
      });
    });
  });

  describe('check return-function-promise.js', () => {
    it('should return correct value', () => {
      let mockModule = new MockModule(
        'return-function-promise',
        require('../../data/fixtures/mock_modules/return-function-promise'),
      );

      return mockModule.getResult().then((data: any) => {
        expect(data).to.eql({
          name: 'return-function-promise',
          age: 16,
        });
      });
    });
  });

  describe('check return-function-pure.js', () => {
    it('should return correct value', () => {
      let mockModule = new MockModule(
        'return-function-pure',
        require('../../data/fixtures/mock_modules/return-function-pure'),
      );

      return mockModule.getResult().then((data: any) => {
        expect(data).to.eql({
          name: 'return-function-pure',
          age: 16,
        });
      });
    });
  });

  describe('check return-function-with-param.js', () => {
    it('should return correct value', () => {
      let mockModule = new MockModule(
        'return-function-with-param',
        require('../../data/fixtures/mock_modules/return-function-with-param'),
      );

      return mockModule.getResult('name-a', 2, 'not-exist').then((data: any) => {
        expect(data).to.eql({
          name: 'return-function-with-param',
          desc: 'a=name-a,b=2',
          age: 16,
        });
      });
    });
  });

  describe('check return-plain-object.js', () => {
    it('should return correct value', () => {
      let mockModule = new MockModule(
        'return-plain-object',
        require('../../data/fixtures/mock_modules/return-plain-object'),
      );

      return mockModule.getResult().then((data: any) => {
        expect(data).to.eql({
          name: 'return-plain-object',
          age: 16,
        });
      });
    });
  });

  describe('check return-promise.js', () => {
    it('should return correct value', () => {
      let mockModule = new MockModule(
        'return-promise',
        require('../../data/fixtures/mock_modules/return-promise'),
      );

      return mockModule.getResult().then((data: any) => {
        expect(data).to.eql({
          name: 'return-promise',
          age: 16,
        });
      });
    });
  });

  describe('check no-config', () => {
    it('should return correct value', () => {
      let mockModule = new MockModule(
        'no-config',
        require('../../data/fixtures/mock_modules/no-config'),
      );

      return mockModule.getResult().then((data: any) => {
        expect(data).to.eql({
          name: 'no-config',
          age: 16,
        });
      });
    });
  });

  describe('check exist-config', () => {
    it('should return correct value', () => {
      let mockModule = new MockModule(
        'exist-config',
        require('../../data/fixtures/mock_modules/exist-config'),
        require('../../data/fixtures/mock_modules/exist-config/config'),
      );

      return mockModule.getResult().then((data: any) => {
        expect(data).to.eql({
          name: 'exist-config',
          age: 16,
        });
      });
    });
  });

  describe('check return-function-but-throw-error', () => {
    it('should return correct value', () => {
      let mockModule = new MockModule(
        'return-function-but-throw-error',
        require('../../data/fixtures/mock_modules/return-function-but-throw-error'),
      );

      return mockModule.getResult().catch((e: any) => {
        expect(e).to.be.a('Error').and.have.property('message', 'return-function-but-throw-error');
      });
    });
  });

  describe('check return-function-but-no-return', () => {
    it('should return correct value', () => {
      let mockModule = new MockModule(
        'return-function-but-no-return',
        require('../../data/fixtures/mock_modules/return-function-but-no-return'),
      );

      return mockModule.getResult().then((data: any) => {
        expect(data).to.be.undefined;
      });
    });
  });
});

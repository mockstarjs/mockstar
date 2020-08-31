import {expect} from 'chai';

import MockModule from '../../../src/model/MockModule';
import MockerConfig from '../../../src/model/MockerConfig';

const mockModuleList: any[] = [];

mockModuleList.push(
  new MockModule(
    'return-plain-object',
    require('../../data/fixtures/mock_modules/return-plain-object'),
  ),
);
mockModuleList.push(
  new MockModule('exist-config', require('../../data/fixtures/mock_modules/exist-config')),
);

describe('./model/MockerConfig.ts', () => {
  describe('check params no config and mockModuleList', () => {
    let mockerConfig: MockerConfig;

    before(() => {
      mockerConfig = new MockerConfig('no-config-no-list');
    });

    it('should equal correct value', () => {
      expect(mockerConfig).to.eql({
        name: 'no-config-no-list',
        route: '',
        routeExtra: {},
        plugin: 'xhr',
        description: 'no-config-no-list',
        disable: false,
        defaultModule: '',
        activeModule: '',
        method: 'GET',
        priority: 0,
        tags: ['全部'],
      });
    });
  });

  describe('check params no mockModuleList', () => {
    let mockerConfig: MockerConfig;

    before(() => {
      mockerConfig = new MockerConfig(
        'no-list',
        require('../../data/fixtures/mocker-config/basic'),
      );
    });

    it('should equal correct value', () => {
      expect(mockerConfig).to.eql({
        activeModule: 'exist-config',
        defaultModule: 'exist-config',
        description: 'basic example description',
        disable: true,
        method: 'POST',
        name: 'no-list',
        plugin: 'xhr',
        priority: 88,
        route: '/cgi-bin/a/b/basic',
        routeExtra: {
          desc: 'I am from routeExtra',
        },
        tags: ['全部', '标签1', '标签2'],
      });
    });
  });

  describe('check empty.json', () => {
    let mockerConfig: MockerConfig;

    before(() => {
      mockerConfig = new MockerConfig(
        'empty',
        require('../../data/fixtures/mocker-config/empty'),
        mockModuleList,
      );
      // console.log(mockerConfig);
    });

    it('should be instanceof MockerConfig ', () => {
      expect(mockerConfig).to.be.an.instanceof(MockerConfig);
    });

    it('should contain some fields', () => {
      expect(mockerConfig).to.have.all.keys(
        'name',
        'description',
        'route',
        'routeExtra',
        'plugin',
        'disable',
        'defaultModule',
        'activeModule',
        'method',
        'priority',
        'tags',
      );
    });

    it('should equal correct value', () => {
      expect(mockerConfig).to.eql({
        name: 'empty',
        route: '',
        routeExtra: {},
        plugin: 'xhr',
        description: 'empty',
        disable: false,
        defaultModule: '',
        activeModule: 'return-plain-object',
        method: 'GET',
        priority: 0,
        tags: ['全部'],
      });
    });
  });

  describe('check simple.json', () => {
    it('should equal correct value', () => {
      let mockerConfig = new MockerConfig(
        'simple',
        require('../../data/fixtures/mocker-config/simple'),
        mockModuleList,
      );

      expect(mockerConfig).to.eql({
        name: 'simple',
        route: '/cgi-bin/a/b/simple',
        routeExtra: {},
        plugin: 'xhr',
        description: 'simple',
        disable: false,
        defaultModule: '',
        activeModule: 'return-plain-object',
        method: 'GET',
        priority: 0,
        tags: ['全部'],
      });
    });
  });

  describe('check basic.json', () => {
    it('should equal correct value', () => {
      let mockerConfig = new MockerConfig(
        'basic',
        require('../../data/fixtures/mocker-config/basic'),
        mockModuleList,
      );

      expect(mockerConfig).to.eql({
        name: 'basic',
        route: '/cgi-bin/a/b/basic',
        routeExtra: {
          desc: 'I am from routeExtra',
        },
        plugin: 'xhr',
        description: 'basic example description',
        disable: true,
        defaultModule: 'exist-config',
        activeModule: 'exist-config',
        method: 'POST',
        priority: 88,
        tags: ['全部', '标签1', '标签2'],
      });
    });

    it('check update()', () => {
      let mockerConfig = new MockerConfig(
        'basic',
        require('../../data/fixtures/mocker-config/basic'),
        mockModuleList,
      );

      mockerConfig.update({disable: false, activeModule: 'another-active-module'});

      expect(mockerConfig).to.eql({
        name: 'basic',
        route: '/cgi-bin/a/b/basic',
        routeExtra: {
          desc: 'I am from routeExtra',
        },
        plugin: 'xhr',
        description: 'basic example description',
        disable: false,
        defaultModule: 'exist-config',
        activeModule: 'another-active-module',
        method: 'POST',
        priority: 88,
        tags: ['全部', '标签1', '标签2'],
      });
    });
  });

  describe('check basic_02.json', () => {
    it('should equal correct value', () => {
      let mockerConfig = new MockerConfig(
        'basic_02',
        require('../../data/fixtures/mocker-config/basic_02'),
        mockModuleList,
      );

      expect(mockerConfig).to.eql({
        name: 'basic_02',
        route: '',
        routeExtra: {},
        plugin: 'xhr',
        description: 'basic_02',
        disable: false,
        defaultModule: 'exist-config',
        activeModule: 'return-plain-object',
        method: 'GET',
        priority: 0,
        tags: ['全部', '标签1', '标签2'],
      });
    });
  });

  describe('check basic_03_relative_route.json', () => {
    it('should equal correct value', () => {
      let mockerConfig = new MockerConfig(
        'basic',
        require('../../data/fixtures/mocker-config/basic_03_relative_route'),
        mockModuleList,
      );

      expect(mockerConfig).to.eql({
        name: 'basic',
        route: '/cgi-bin/a/b/basic_03_relative_route',
        routeExtra: {
          desc: 'I am from routeExtra',
        },
        plugin: 'xhr',
        description: 'basic example description',
        disable: true,
        defaultModule: 'exist-config',
        activeModule: 'exist-config',
        method: 'POST',
        priority: 88,
        tags: ['全部', '标签1', '标签2'],
      });
    });
  });

  describe('check basic_04_invalid_active_module.json', () => {
    it('should equal correct value', () => {
      let mockerConfig = new MockerConfig(
        'basic',
        require('../../data/fixtures/mocker-config/basic_04_invalid_active_module'),
        mockModuleList,
      );

      expect(mockerConfig).to.eql({
        name: 'basic',
        route: '/cgi-bin/a/b/basic_04_invalid_active_module',
        routeExtra: {
          desc: 'I am from routeExtra',
        },
        plugin: 'xhr',
        description: 'basic example description',
        disable: true,
        defaultModule: 'basic_04_invalid_active_module',
        activeModule: 'return-plain-object',
        method: 'POST',
        priority: 88,
        tags: ['全部', '标签1', '标签2'],
      });
    });
  });

  describe('check basic_async.json', () => {
    it('should equal correct value', () => {
      let mockerConfig = new MockerConfig(
        'basic_async',
        require('../../data/fixtures/mocker-config/basic_async'),
        mockModuleList,
      );

      expect(mockerConfig).to.eql({
        name: 'basic_async',
        route: '/cgi-bin/a/b/basic_async',
        routeExtra: {},
        plugin: 'async',
        description: 'basic_async',
        disable: false,
        defaultModule: '',
        activeModule: 'return-plain-object',
        method: 'GET',
        priority: 0,
        tags: ['全部'],
      });
    });
  });
});

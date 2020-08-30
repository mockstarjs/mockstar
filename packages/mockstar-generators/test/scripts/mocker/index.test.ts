import path from 'path';
import 'mocha';
import { expect } from 'chai';
import fse from 'fs-extra';
import walkSync from 'walk-sync';

import initMocker, { getMockerGeneratorTemplatesRoot } from '../../../src/mocker';

const FIXTURE_PATH = path.join(__dirname, '../../data/fixtures/mockers');
const TMP_PATH = path.join(__dirname, '../../tmp');

describe('./mocker/index.ts', () => {
  describe('basic check', () => {
    it('initMocker should be a function', () => {
      expect(initMocker).to.be.an('function');
    });

    it('getMockerGeneratorTemplatesRoot should be a function', () => {
      expect(getMockerGeneratorTemplatesRoot).to.be.an('function');
    });
  });

  describe('initMocker(i-am-xhr-request-get)', () => {
    const name = 'i-am-xhr-request-get';
    const fixtureSaveDir = path.join(FIXTURE_PATH, name);
    const tmpSaveDir = path.join(TMP_PATH, name);

    before(async () => {
      await initMocker({
        isDev: false,
        parentPath: TMP_PATH,
        isInitReadme: true,
        config: {
          name: name,
          method: 'GET',
          route: '/cgi-bin/i-am-xhr-request-get',
        },
        debugMockModuleJsonData: {
          retcode: 0,
          result: {
            uid: 99999,
            type: 9,
            description: '我是 debug',
            other_msg: '仅作为临时调试用，建议按照不同的场景构造不同的 mock module!',
          },
        },
      });
    });

    after(() => {
      fse.removeSync(tmpSaveDir);
    });

    it('check all files exits', async () => {
      const tmpPaths = walkSync(tmpSaveDir);
      const expectPaths = walkSync(fixtureSaveDir);

      expect(tmpPaths).to.eql(expectPaths);
      expect(tmpPaths.length).to.equal(19);
    });

    it('check all files equal', async () => {
      const tmpPaths = walkSync.entries(tmpSaveDir);

      tmpPaths.forEach(entry => {
        if (!entry.isDirectory()) {
          const tmpContent = fse.readFileSync(path.join(tmpSaveDir, entry.relativePath), 'utf8');
          const expectContent = fse.readFileSync(
            path.join(fixtureSaveDir, entry.relativePath),
            'utf8',
          );

          expect(tmpContent).to.equal(expectContent);
        }
      });
    });
  });

  describe('initMocker(i-am-xhr-request-post)', () => {
    const name = 'i-am-xhr-request-post';
    const fixtureSaveDir = path.join(FIXTURE_PATH, name);
    const tmpSaveDir = path.join(TMP_PATH, name);

    before(async () => {
      await initMocker({
        isDev: false,
        parentPath: TMP_PATH,
        isInitReadme: true,
        config: {
          name: name,
          method: 'POST',
          route: '/cgi-bin/i-am-xhr-request-post',
        },
        debugMockModuleJsonData: {
          retcode: 0,
          result: {
            description: '我是 debug post',
            other_msg: '仅作为临时调试用，建议按照不同的场景构造不同的 mock module!',
          },
        },
      });
    });

    after(() => {
      fse.removeSync(tmpSaveDir);
    });

    it('check all files exits', async () => {
      const tmpPaths = walkSync(tmpSaveDir);
      const expectPaths = walkSync(fixtureSaveDir);

      expect(tmpPaths).to.eql(expectPaths);
      expect(tmpPaths.length).to.equal(19);
    });

    it('check all files equal', async () => {
      const tmpPaths = walkSync.entries(tmpSaveDir);

      tmpPaths.forEach(entry => {
        if (!entry.isDirectory()) {
          const tmpContent = fse.readFileSync(path.join(tmpSaveDir, entry.relativePath), 'utf8');
          const expectContent = fse.readFileSync(
            path.join(fixtureSaveDir, entry.relativePath),
            'utf8',
          );

          expect(tmpContent).to.equal(expectContent);
        }
      });
    });
  });

  describe('getMockerGeneratorTemplatesRoot()', () => {
    it('getMockerGeneratorTemplatesRoot should be a function', () => {
      expect(getMockerGeneratorTemplatesRoot).to.be.an('function');
    });

    it('getMockerGeneratorTemplatesRoot() should be correct', () => {
      expect(getMockerGeneratorTemplatesRoot()).to.be.equal(
        path.join(__dirname, '../../../src/mocker/generator/templates'),
      );
    });
  });
});

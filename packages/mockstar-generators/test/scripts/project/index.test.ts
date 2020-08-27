import path from 'path';
import 'mocha';
import { expect } from 'chai';
import fse from 'fs-extra';
import walkSync from 'walk-sync';

import initProject, { getProjectGeneratorTemplatesRoot } from '../../../src/project';

const FIXTURE_PATH = path.join(__dirname, '../../data/fixtures/projects');
const TMP_PATH = path.join(__dirname, '../../tmp');

describe('./project/index.ts', () => {
  describe('basic check', () => {
    it('initProject should be a function', () => {
      expect(initProject).to.be.an('function');
    });

    it('getProjectGeneratorTemplatesRoot should be a function', () => {
      expect(getProjectGeneratorTemplatesRoot).to.be.an('function');
    });
  });

  describe('initProject(mockstar-app-9527)', () => {
    const name = 'mockstar-app-9527';
    const fixtureSaveDir = path.join(FIXTURE_PATH, name);
    const tmpSaveDir = path.join(TMP_PATH, name);

    before(async () => {
      await initProject({
        isDev: false,
        parentPath: TMP_PATH,
        name: name,
        port: 9527,
      });
    });

    after(() => {
      fse.removeSync(tmpSaveDir);
    });

    it('check all files exits', async () => {
      const tmpPaths = walkSync(tmpSaveDir);
      const expectPaths = walkSync(fixtureSaveDir);

      expect(tmpPaths).to.eql(expectPaths);
      expect(tmpPaths.length).to.equal(27);
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

  describe('getProjectGeneratorTemplatesRoot()', () => {
    it('getProjectGeneratorTemplatesRoot should be a function', () => {
      expect(getProjectGeneratorTemplatesRoot).to.be.an('function');
    });

    it('getProjectGeneratorTemplatesRoot() should be correct', () => {
      expect(getProjectGeneratorTemplatesRoot()).to.be.equal(
        path.join(__dirname, '../../../src/project/generator/templates'),
      );
    });
  });
});

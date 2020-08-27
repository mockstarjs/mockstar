import 'mocha';
import { expect } from 'chai';

import * as mockstarGenerators from '../../src/index';

describe('./index.ts', () => {
  it('export should be correct', () => {
    expect(mockstarGenerators).to.have.all.keys(
      'initMocker',
      'initProject',
      'getMockerGeneratorTemplatesRoot',
      'getProjectGeneratorTemplatesRoot',
    );
  });
});

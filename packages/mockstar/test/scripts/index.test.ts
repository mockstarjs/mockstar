import 'mocha';
import {expect} from 'chai';

import * as mockstar from '../../src/index';

describe('./index.ts', () => {
  it('export should be correct', () => {
    expect(mockstar).to.have.all.keys(
      'Mocker',
      'Parser',
      'MockStarQuery',
      'createMockStarQuery',
      'getQueryItem',
      'MS_DISABLE',
      'MS_QUERY_KEY',
      'MS_FROM',
    );
  });
});

import React, { Component } from 'react';

import CreateMocker from './components/create-mocker';
import SearchMocker from './components/search-mocker';

import './index.less';

export default class Debug extends Component {
  render() {
    return (
      <div className="page-debug">
        <CreateMocker />
        <SearchMocker />
      </div>
    );
  }
}

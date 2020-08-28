import React, { Component } from 'react';

import CreateMocker from './components/create-mocker';

import './index.less';

export default class Debug extends Component {
  render() {
    return (
      <div className="page-debug text-content">
        <CreateMocker />
      </div>
    );
  }
}

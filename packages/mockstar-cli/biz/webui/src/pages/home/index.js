import React, { Component } from 'react';

import './index.less';

export default class Home extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="page-home">
        <h2>HOME</h2>
        <p>欢迎使用 <a href="https://github.com/mockstarjs/mockstar" target="_blank">mockstar</a>，欢迎给我们提 <a href="https://github.com/mockstarjs/mockstar/issues" target="_blank">Issues</a>！</p>
      </div>
    );
  }
}
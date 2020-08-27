import React, { Component } from 'react';
import { connect } from 'react-redux';

import CreateMockerForm from './create-mocker-form';

import './index.less';

class CreateMocker extends Component {
  render() {
    const { localServerConfig } = this.props;

    return (
      <div className="create-mocker">
        <h2>创建 mocker</h2>

        <CreateMockerForm localServerConfig={localServerConfig} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { detailInfo } = state;

  return {
    localServerConfig: detailInfo.config,
  };
}

export default connect(mapStateToProps)(CreateMocker);

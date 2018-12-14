import React, { Component } from 'react';
import { Button, Modal } from 'antd';

import './index.less';

export default class MockerShowResult extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showData: '',
      mockerName: '',
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDataChange = this.handleDataChange.bind(this);
  }

  handleNameChange = (event) => {
    this.setState({
      mockerName: event.target.value
    });
  };

  handleDataChange = (event) => {
    this.setState({
      showData: event.target.value
    });
  };

  render() {
    const { data, onHide, onSubmit, namespace, mockerItem } = this.props;
    const { showData, mockerName } = this.state;

    const isShow = !!data;

    return (
      <div className="mocker-show-result">

        <Modal
          title="添加"
          visible={isShow}
          onCancel={onHide}
          onOk={onHide}
          footer={[
            <Button key="push" type="primary" size="large" onClick={onSubmit.bind(this, mockerItem.name, mockerName, namespace, showData)}>
              添加
            </Button>,
            <Button key="cancel" type="primary" size="large" onClick={onHide}>
              关闭
            </Button>
          ]}
        >

            <label>mocker 姓名：</label><input type="text" placeholder="请输入 mocker 名字" value={mockerName} onChange={this.handleNameChange}></input>
            <textarea
              name="cgidata"
              id="cgidata"
              style={{ width: '100%', minHeight: '600px' }}
              value={showData}
              onChange={this.handleDataChange}
            ></textarea>

        </Modal>

      </div>
    );
  }

}
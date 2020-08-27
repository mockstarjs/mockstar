import React, { Component } from 'react';
import { Button, Form, Input } from 'antd';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const debugJsonData = {
  retcode: 0,
  result: {
    description: '我是 debug',
  },
};

class NormalLoginForm extends Component {
  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        this.props.handleCreateMocker(values);
      }
    });
  };

  render() {
    const { localServerConfig } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="父级目录">
          {getFieldDecorator('parentPath', {
            rules: [{ required: true, message: 'Please input your parentPath!' }],
            initialValue: localServerConfig.mockServerPath,
          })(<Input placeholder="parentPath" />)}
        </Form.Item>

        <Form.Item label="mocker name">
          {getFieldDecorator('mockerName', {
            rules: [{ required: true, message: 'Please input your mockerName!' }],
            initialValue: 'i-am-xhr-request-get',
          })(<Input placeholder="mockerName" />)}
        </Form.Item>

        <Form.Item label="mocker method">
          {getFieldDecorator('mockerMethod', {
            rules: [{ required: true, message: 'Please input your mockerMethod!' }],
            initialValue: 'GET',
          })(<Input placeholder="mockerMethod" />)}
        </Form.Item>

        <Form.Item label="mocker route">
          {getFieldDecorator('mockerRoute', {
            rules: [{ required: true, message: 'Please input your mockerRoute!' }],
            initialValue: '/cgi-bin/i-am-xhr-request-get',
          })(<Input placeholder="mockerRoute" />)}
        </Form.Item>

        <Form.Item label="桩数据">
          {getFieldDecorator('debugMockModuleJsonData', {
            rules: [],
            initialValue: JSON.stringify(debugJsonData, null, 2),
          })(<Input.TextArea autoSize />)}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create({ name: 'normal_login' })(NormalLoginForm);

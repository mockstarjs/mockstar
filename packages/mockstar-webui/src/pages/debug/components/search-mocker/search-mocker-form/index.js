import React, { Component } from 'react';
import { Button, Form, Input } from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default class CreateMockerForm extends Component {

  onFinish = values => {
    console.log('Success:', values);
    this.props.handleSearchMocker(values);
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  render() {
    const initialValues = {
      route: '/cgi-bin/i-am-xhr-request-get',
    };

    return (
      <Form
        {...layout}
        name="basic"
        initialValues={initialValues}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}>

        <Form.Item
          label="route"
          name="route"
          rules={[{ required: true, message: 'Please input your route!' }]}>
          <Input />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

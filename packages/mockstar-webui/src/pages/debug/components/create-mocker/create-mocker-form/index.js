import React, { Component } from 'react';
import { Button, Form, Input } from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const debugJsonData = {
  retcode: 0,
  result: {
    description: '我是 debug',
  },
};

export default class CreateMockerForm extends Component {
  formRef = React.createRef();

  componentWillReceiveProps(nextProps, nextContext) {
    if (
      this.props.localServerConfig.mockServerPath !== nextProps.localServerConfig.mockServerPath
    ) {
      this.formRef.current.setFieldsValue({
        parentPath: nextProps.localServerConfig.mockServerPath,
      });
    }
  }

  onFinish = values => {
    console.log('Success:', values);
    this.props.handleCreateMocker(values);
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  render() {
    const { localServerConfig } = this.props;

    const initialValues = {
      parentPath: localServerConfig.mockServerPath,
      mockerName: 'i-am-xhr-request-get',
      mockerMethod: 'GET',
      mockerRoute: '/cgi-bin/i-am-xhr-request-get',
      debugMockModuleJsonData: JSON.stringify(debugJsonData, null, 2),
    };

    return (
      <Form
        {...layout}
        name="basic"
        ref={this.formRef}
        initialValues={initialValues}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}>
        <Form.Item
          label="父级目录"
          name="parentPath"
          rules={[{ required: true, message: 'Please input your parentPath!' }]}>
          <Input value={localServerConfig.mockServerPath} />
        </Form.Item>

        <Form.Item
          label="mocker name"
          name="mockerName"
          rules={[{ required: true, message: 'Please input your mockerName!' }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="mocker method"
          name="mockerMethod"
          rules={[{ required: true, message: 'Please input your mockerMethod!' }]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="mocker route"
          name="mockerRoute"
          rules={[{ required: true, message: 'Please input your mockerRoute!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="桩数据" name="debugMockModuleJsonData">
          <Input.TextArea autoSize />
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

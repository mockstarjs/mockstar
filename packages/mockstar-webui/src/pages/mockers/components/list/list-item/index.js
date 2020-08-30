import React from 'react';
import { NavLink } from 'react-router-dom';

import { Alert, Button, Card, Radio } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

import './index.less';

export default function MockerListItem(props) {
  const { mockerItem, mockersPath, curTag, index, clickTag, setActive, setDisable } = props;
  const mockerItemConfig = mockerItem.config;

  const isDisabled = mockerItemConfig.disable;

  return (
    <Card
      className="mocker-list-item"
      title={`${index + 1}. ${mockerItem.name}`}
      extra={
        <div className="card-action">
          <Button
            type={isDisabled ? 'primary' : 'default'}
            icon={<SettingOutlined />}
            className="set-disable-btn"
            onClick={setDisable.bind(this, mockerItem.name, isDisabled)}>
            {isDisabled ? '启用' : '禁用'}
          </Button>

          <NavLink to={`${mockersPath}/${mockerItem.name}`}>更多...</NavLink>
        </div>
      }>
      <div className={mockerItemConfig.plugin + ' ' + mockerItemConfig.method} />

      <div className="detail">
        <Alert message={mockerItemConfig.description} type="info" showIcon />
      </div>

      <p>点击标签进行过滤：</p>
      <Radio.Group value={curTag} onChange={(e) => {
        clickTag(e.target.value);
      }}>
        {
          mockerItemConfig.tags.map((tagName, tagIndex) => {
            return (
              <Radio.Button value={tagName} key={tagIndex}>{tagName}</Radio.Button>
            );
          })
        }
      </Radio.Group>

      <br />
      <br />

      <p>请选择需要激活的模块：</p>
      <Radio.Group
        value={mockerItemConfig.activeModule}
        disabled={isDisabled ? 'disable' : ''}
        onChange={(e) => {
          setActive(mockerItem.name, e.target.value);
        }}
      >
        {
          mockerItem.mockModuleList.map((item, index) => {
            return (
              <Radio.Button value={item.name} key={index}>{item.name}</Radio.Button>
            );
          })
        }
      </Radio.Group>
    </Card>
  );
}

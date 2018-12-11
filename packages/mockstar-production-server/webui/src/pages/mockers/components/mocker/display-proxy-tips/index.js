import React from 'react';
import { Card } from 'antd';

import './index.less';

export default function MockerProxyInfo(props) {
    const { isDisabled, mockerItem, mockServerHost } = props;

    // 非 xhr 场景无需设置代理
    if (mockerItem.config.plugin !== 'xhr') {
        return null;
    }

    if (isDisabled) {
        return null;
    }

    return (
        <Card className="mocker-proxy-info">
            <p>whistle 代理设置： <code>/(.*){mockerItem.config.route}(.*)/ {mockServerHost}</code></p>
        </Card>
    );
}

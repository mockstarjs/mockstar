import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getPort, getSiteRoot} from '../../../../custom';

import './index.less';

class ProxyInfo extends Component {
  render() {
    const {localServerConfig} = this.props;

    // hostname 应该与页面一致
    const hostname = window.location.hostname;

    // 如果是本地服务，则需要更换端口号为服务端返回的端口号。
    // 例如本地调试的页面是 127.0.0.1:3000 而 mock server 是 127.0.0.1:9527
    const port =
      hostname === 'localhost' || hostname === '127.0.0.1'
        ? localServerConfig.port
        : window.location.port;

    let mockStarHost = hostname + (port ? `:${port}` : '') + getSiteRoot().slice(0, -1);

    return (
      <div className="proxy-info">
        <h2>代理设置</h2>

        <blockquote>
          强烈推荐使用{' '}
          <a href="https://avwo.github.io/whistle/" target="_blank">
            whistle
          </a>{' '}
          来做代理服务器。
        </blockquote>
        <p>
          假设真实的CGI请求为 <code>http://youdomain.com/cgi-bin/a/b/demo_01</code>
          ，则请设置代理如下：
        </p>

        <pre>
          <code>
            <p>youdomain.com {mockStarHost}</p>
            <p> </p>
            <p># 或者</p>
            <p>youdomain.com/cgi-bin/a/b/demo_01 {mockStarHost}</p>
            <p> </p>
            <p># 或者</p>
            <p>youdomain.com/cgi-bin {mockStarHost}</p>
          </code>
        </pre>

        {getSiteRoot().length > 1 ? (
          <div>
            注意，由于您启用了 <code>namespace</code> 参数，因此，需要在 nginx
            的配置中增加如下配置，否则代理将无法生效！
            <pre>
              <code>
                <p>
                  location ^~ {getSiteRoot()} {'{'}
                </p>
                <p> rewrite {getSiteRoot()}(.*) /$1 break;</p>
                <p> proxy_pass http://127.0.0.1:{getPort()}/;</p>
                <p>{'}'}</p>
              </code>
            </pre>
          </div>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {detailInfo} = state;

  return {
    localServerConfig: detailInfo.config,
  };
}

export default connect(mapStateToProps)(ProxyInfo);

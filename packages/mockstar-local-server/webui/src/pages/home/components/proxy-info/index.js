import React from 'react';

import { getPort, getSiteRoot } from '../../../../custom';

import './index.less';

export default function ProxyInfo(props) {

    return (
        <div className="proxy-info">
            <h2>代理设置</h2>

            <blockquote>强烈推荐使用 <a href="https://avwo.github.io/whistle/" target="_blank">whistle</a> 来做代理服务器。</blockquote>
            <p>假设真实的CGI请求为 <code>http://youdomain.com/cgi-bin/a/b/demo_01</code>，则请设置代理如下：</p>

            <pre>
                <code>
                    youdomain.com {window.location.hostname + (window.location.port ? `:${window.location.port}` : '') + getSiteRoot().slice(0, -1)}
                </code>
            </pre>
            {
                (getSiteRoot().length > 1) ? (
                    <div>
                        注意，由于您启用了 <code>namespace</code> 参数，因此，需要在 nginx 的配置中增加如下配置，否则代理将无法生效！
                        <pre>
                            <code>
                                <p>location {getSiteRoot()} {'{'}</p>
                                <p>    rewrite {getSiteRoot()}(.*) /$1 break;</p>
                                <p>    proxy_pass http://127.0.0.1:{getPort()}/;</p>
                                <p>{'}'}</p>
                            </code>
                        </pre>
                    </div>
                ) : null
            }
        </div>
    );
}


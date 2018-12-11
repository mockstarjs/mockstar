import React, {Component} from 'react';

import './index.less';

export default class Home extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            name: '',
            namespaces: [],
        }
        this.handleChange = this
            .handleChange
            .bind(this);
        this.createNamespace = this
            .createNamespace
            .bind(this);
    }

    componentWillMount() {
        const xhr = new XMLHttpRequest();
        const that = this;
        xhr.open('GET', '/getnamespace');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const result = JSON.parse(xhr.responseText);
                that.setState({namespaces: result.namespaces});
            } else {
                that.setState({namespaces: []});
            }
        }
        xhr.onerror = function(err) {
            alert(err);
        }
        xhr.send();
    }

    handleChange(event) {
        this.setState({name: event.target.value})
    }

    createNamespace() {
        const {name} = this.state;
        const that = this;
        if (!name) {
            alert('please input name');
            return false;
        }
        const xhr = new XMLHttpRequest();
        xhr.open('GET', '/createnamespace?name=' + name);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const result = JSON.parse(xhr.responseText);
                if (result.ret === 0) {
                    that.setState({namespaces: result.namespaces});
                } else {
                    alert(result.msg)
                }
            } else {
                // console.log('server error')
            }
        }
        xhr.onerror = function (err) {
            alert(err);
        }
        xhr.send();
    }

    render() {
        const { name, namespaces } = this.state;
        let namespaceArr = namespaces.map((item) => {
            const templink = `./mockers/${item}`;
            return <li key={item}><a href={templink}>{item}</a></li>
        })
        return (
            <div className="page-home text-content">
                <p>欢迎来到 now.qq.com 域名的
                    <a href="https://github.com/mockstarjs/mockstar" target="_blank">MockStar</a>
                    项目。</p>

                <h2>1. 测试环境列表</h2>

                <p>所有测试环境共用 mock server ，但是独立操作。如需新建，单独联系 linjianghe 即可（后续将在本页面进行动态创建）。</p>

                <div id="edit">
                    <label>新增环境名字：</label>
                    <input
                        type="text"
                        value={name}
                        onChange={this.handleChange}
                        placeholder="请输入环境名字"/>
                    <button onClick={this.createNamespace}>添加</button>
                </div>
                <ul>
                    {namespaceArr}
                </ul>

                <h2>2. mock server 仓库</h2>

                <p>本项目代码托管在
                    <a
                        href="http://git.code.oa.com/mockstarjs/mockstar-project-now"
                        target="_blank">http://git.code.oa.com/mockstarjs/mockstar-project-now</a>， 由织云发布（后续将打通CI，即提交代码之后自动部署）。</p>
            </div>
        );
    }
}

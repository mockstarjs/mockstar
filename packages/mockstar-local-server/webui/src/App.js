import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Layout } from 'antd';

import LayoutHeader from './components/layout-header';

import Home from './pages/home';
import Mockers from './pages/mockers';

import { getSiteBase, getSiteRoot } from './custom';
import { loadDetail } from './datas/data-detail';

import './App.less';

export default class App extends Component {
    componentDidMount() {
        // 加载管理端的信息，包括配置等
        this.props.dispatch(loadDetail());
    }

    render() {
        return (
            <Router>

                <Layout className="mockstar-container">

                    <LayoutHeader />

                    <Layout.Content>
                        <Route exact path={`${getSiteRoot()}`} component={Home} />
                        <Route path={`${getSiteBase()}/dashboard`} component={Home} />
                        <Route path={`${getSiteBase()}/mockers`} component={Mockers} />
                    </Layout.Content>
                </Layout>

            </Router>
        );
    }
}
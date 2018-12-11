import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import { Layout } from 'antd';

import LayoutHeader from './components/layout-header';

import Home from './pages/home';
import Server from './pages/server';
import Mockers from './pages/mockers';

import { getSiteBase } from './custom';
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
                        <Switch>
                            <Redirect exact from="/" to={`${getSiteBase()}/server`} />
                            <Redirect exact from={`${getSiteBase()}`} to={`${getSiteBase()}/server`} />
                            <Route path={`${getSiteBase()}/server`} component={Server} />
                            <Route path={`${getSiteBase()}/dashboard`} component={Home} />
                            <Route path={`${getSiteBase()}/mockers`} component={Mockers} />
                        </Switch>
                    </Layout.Content>
                </Layout>

            </Router>
        );
    }
}
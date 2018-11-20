import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Layout } from 'antd';

import LayoutHeader from './components/layout-header';

import Home from './pages/home';
import Mockers from './pages/mockers';

import './App.less';

import { getSiteBase, getSiteRoot } from './custom';

const App = () => (
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

export default App;
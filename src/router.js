import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import App from './App';

import BasicLayout from './layouts/BasicLayout';
import PublicLayout from './layouts/PublicLayout';

import Home from './pages/home';
import Buttons from './pages/ui/buttons';
import Carousels from './pages/ui/carousels';
import Modals from './pages/ui/modals';
import Loadings from './pages/ui/loadings';
import Notifications from './pages/ui/notifications';
import Messages from './pages/ui/messages';
import Tabs from './pages/ui/tabs';
import Gallery from './pages/ui/gallery';

import Login from './pages/form/login';
import Register from './pages/form/register';

import BasicTable from './pages/table/basic';
import HighTable from './pages/table/high';

import Rich from './pages/rich';
import City from './pages/city';
import Order from './pages/order';
import OrderDetail from './pages/order/Detail';
import User from './pages/user';
import BikeMap from './pages/map';

import Bar from './pages/charts/bar';
import Pie from './pages/charts/pie';
import Line from './pages/charts/line';

import Persission from './pages/permission';

import NoMatch from './pages/router-demo/NoMatch';

export default class Router extends Component {
    render() {
        return (
            <HashRouter>
                <App>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route
                            path="/common"
                            render={() => (
                                <PublicLayout>
                                    <Route
                                        path="/common/order/detail/:id"
                                        component={OrderDetail}
                                    />
                                </PublicLayout>
                            )}
                        />
                        <Route
                            path="/"
                            render={() => (
                                <BasicLayout>
                                    <Switch>
                                        {/* <Route exact path="/" component={Home}/> */}
                                        <Route path="/home" component={Home} />
                                        <Route path="/ui/buttons" component={Buttons} />
                                        <Route path="/ui/carousel" component={Carousels} />
                                        <Route path="/ui/modals" component={Modals} />
                                        <Route path="/ui/loadings" component={Loadings} />
                                        <Route path="/ui/notification" component={Notifications} />
                                        <Route path="/ui/messages" component={Messages} />
                                        <Route path="/ui/tabs" component={Tabs} />
                                        <Route path="/ui/gallery" component={Gallery} />
                                        <Route path="/form/login" component={Login} />
                                        <Route path="/form/reg" component={Register} />
                                        <Route path="/table/basic" component={BasicTable} />
                                        <Route path="/table/high" component={HighTable} />
                                        <Route path="/rich" component={Rich} />
                                        <Route path="/city" component={City} />
                                        <Route path="/order" component={Order} />
                                        <Route path="/user" component={User} />
                                        <Route path="/bike-map" component={BikeMap} />

                                        <Route path="/charts/bar" component={Bar} />
                                        <Route path="/charts/pie" component={Pie} />
                                        <Route path="/charts/line" component={Line} />

                                        <Route path="/permission" component={Persission} />
                                        <Route component={NoMatch} />
                                    </Switch>
                                </BasicLayout>
                            )}
                        />
                    </Switch>
                </App>
            </HashRouter>
        );
    }
}

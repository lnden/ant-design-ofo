import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
import { config } from './utils';
import Locale from './locale';

const { menuGlobal } = config;

function RouterConfig({ history, app }) {
    return (
        <main className="container">
            <Locale>
                <Router history={history}>
                    <Switch>
                        {menuGlobal.map(({ path, ...dynamics }, index) => (
                            <Route
                                key={path}
                                path={path}
                                exact
                                component={dynamic({
                                    app,
                                    ...dynamics,
                                })}
                            />
                        ))}
                    </Switch>
                </Router>
            </Locale>
        </main>
    );
}

export default RouterConfig;

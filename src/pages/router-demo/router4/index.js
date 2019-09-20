import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './home';
import Main from './Main';
import Info from './Info';
import About from '../About';
import Discover from '../Discover';
import NoMatch from '../NoMatch';

export default class Routers extends Component {
    render() {
        return (
            <Router>
                <Home>
                    <Switch>
                        <Route
                            path="/main"
                            render={() => (
                                <Main>
                                    <Route path="/main/:id" component={Info} />
                                </Main>
                            )}
                        />
                        <Route path="/about" component={About} />
                        <Route path="/discover" component={Discover} />
                        <Route component={NoMatch} />
                    </Switch>
                </Home>
            </Router>
        );
    }
}

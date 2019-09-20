import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Home from './home';
import Main from './Main';
import Info from './Info';
import About from '../About';
import Discover from '../Discover';

export default class Routers extends Component {
    render() {
        return (
            <Router>
                <Home>
                    <Route
                        path="/main"
                        render={() => (
                            <Main>
                                <Route path="/main/m" component={Info} />
                            </Main>
                        )}
                    />
                    <Route path="/about" component={About} />
                    <Route path="/discover" component={Discover} />
                </Home>
            </Router>
        );
    }
}

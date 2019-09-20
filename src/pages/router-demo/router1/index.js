import React, { Component } from 'react';
import { HashRouter, Route, Link, Switch } from 'react-router-dom';
import Main from '../Main';
import About from '../About';
import Discover from '../Discover';

export default class Routers extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Main</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/discover">Discover</Link>
                        </li>
                    </ul>
                    <hr />
                    <Switch>
                        <Route path="/" exact component={Main} />
                        <Route path="/about" component={About} />
                        <Route path="/discover" component={Discover} />
                    </Switch>
                </div>
            </HashRouter>
        );
    }
}

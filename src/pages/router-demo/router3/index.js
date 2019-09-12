import React, {Component} from 'react'
import {HashRouter as Router, Route, Link} from 'react-router-dom'
import Home from "./home"
import Main from "./Main";
import Info from "./Info";
import About from "../About";
import Discover from "../Discover";


export default class Routers extends Component {
    render() {
        return (
            <Router>
                <Home>
                    <Route path="/main" render={() =>
                        <Main>
                            <Route path="/main/m" component={Info}></Route>
                        </Main>
                    }></Route>
                    <Route path="/about" component={About}></Route>
                    <Route path="/discover" component={Discover}></Route>
                </Home>
            </Router>
        )
    }
}
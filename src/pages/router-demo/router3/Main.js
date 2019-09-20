import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Main extends Component {
    render() {
        const { children } = this.props;
        return (
            <div>
                主页
                <br />
                <Link to="/main/m">嵌套路由1</Link>
                <hr />
                {children}
            </div>
        );
    }
}

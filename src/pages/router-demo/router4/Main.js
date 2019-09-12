import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class Main extends Component {
    render() {
        return (
            <div>
                主页
                <br/>
                <Link to="/main/m">嵌套路由1</Link>
                <Link to="/main/456">嵌套路由2</Link>
                <hr/>
                {this.props.children}
            </div>
        )
    }
}
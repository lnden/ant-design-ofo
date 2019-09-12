import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class Homes extends Component {
    render() {
        return (
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
                <hr/>
                {this.props.children}
            </div>
        )
    }
}
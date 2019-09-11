import React, {Component} from 'react'
import './default.scss'
import './default.less'

export default class Home extends Component {
    render(){
        return (
            <div className="home-wrap">
                <button>我应该是sass渲染的样式</button>
                <p>我应该是less渲染的样式</p>
                
            </div>
        )
    }
}



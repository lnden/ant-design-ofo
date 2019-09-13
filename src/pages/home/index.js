import React, {Component} from 'react'
import './default.scss'
import './default.less'

export default class Home extends Component {

    handleClick = () => {
        // window.location.href =`/#/common/roder/detail/${1}`;
        // window.open(`/#/common/order/detail/${1}`,'_blank');
        this.props.history.push(`/common/order/detail/${1}`)
    }

    render(){
        return (
            <div className="home-wrap">
                <button className="sass">我应该是sass渲染的样式</button>
                <button className="less">我应该是less渲染的样式</button> 
                <button onClick={this.handleClick}>跳转到公共的详情页面</button>
            </div>
        )
    }
}



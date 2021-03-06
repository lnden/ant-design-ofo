import React, { Component } from 'react';
import './default.scss';
import './default.less';

export default class Home extends Component {
    componentDidMount() {
        const message = {
            body: {
                user: {
                    firstName: 'Lily',
                },
            },
        };
        const firstName =
            (message && message.body && message.body.user && message.body.user.firstName) ||
            'default';
        const otherFirstName = message?.body?.user?.firstName || 'default';
        console.log(firstName);
        console.log(otherFirstName);
    }

    handleClick = () => {
        // window.location.href =`/#/common/roder/detail/${1}`;
        // window.open(`/#/common/order/detail/${1}`,'_blank');
        const { history } = this.props;
        history.push(`/common/order/detail/${1}`);
    };

    render() {
        return (
            <div className="home-wrap">
                <button className="sass" type="button">
                    我应该是sass渲染的样式
                </button>
                <button className="less" type="button">
                    我应该是less渲染的样式
                </button>
                <button onClick={this.handleClick} type="button">
                    跳转到公共的详情页面
                </button>
            </div>
        );
    }
}

// 装饰器的使用
// function testable(target) {
//     target.prototype.isTestable = true;
// }
//
// @testable
// class MyTestableClass {}
//
// const obj = new MyTestableClass();
// console.log(obj.isTestable);

import React, { Component } from 'react';

export default class Info extends Component {
    render() {
        const {
            match: {
                params: { id },
            },
        } = this.props;
        return (
            <div>
                这里是设置动态路由功能：
                {id}
            </div>
        );
    }
}

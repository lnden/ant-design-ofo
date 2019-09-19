import React, { Component } from 'react';
import { Card, Button, message } from 'antd';

export default class Messages extends Component {
    handleShowMessage = type => {
        message[type]('恭喜你，React进阶成功', 3, () => {
            // console.log('message已经关闭了');
        });
    };

    render() {
        return (
            <div>
                <Card title="全局提示框">
                    <Button type="primary" onClick={() => this.handleShowMessage('success')}>
                        Success
                    </Button>
                    <Button type="primary" onClick={() => this.handleShowMessage('info')}>
                        Info
                    </Button>
                    <Button type="primary" onClick={() => this.handleShowMessage('warning')}>
                        Warning
                    </Button>
                    <Button type="primary" onClick={() => this.handleShowMessage('error')}>
                        Error
                    </Button>
                    <Button type="primary" onClick={() => this.handleShowMessage('loading')}>
                        loading
                    </Button>
                </Card>
            </div>
        );
    }
}

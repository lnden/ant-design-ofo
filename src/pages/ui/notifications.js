import React, { Component } from 'react';
import { Card, Button, notification } from 'antd';

export default class Notifications extends Component {
    handleOpenNotification = (type, direction) => {
        if (direction) {
            notification.config({
                placement: direction,
            });
        }
        notification[type]({
            message: '标题简述',
            description: '成功引入notification组件',
        });
    };

    render() {
        return (
            <div>
                <Card title="通知提醒框">
                    <Button type="primary" onClick={() => this.handleOpenNotification('success')}>
                        Success
                    </Button>
                    <Button type="primary" onClick={() => this.handleOpenNotification('info')}>
                        Info
                    </Button>
                    <Button type="primary" onClick={() => this.handleOpenNotification('warning')}>
                        Warning
                    </Button>
                    <Button type="primary" onClick={() => this.handleOpenNotification('error')}>
                        Error
                    </Button>
                </Card>
                <Card title="通知提醒框位置">
                    <Button
                        type="primary"
                        onClick={() => this.handleOpenNotification('success', 'topLeft')}
                    >
                        Success
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => this.handleOpenNotification('info', 'topRight')}
                    >
                        Info
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => this.handleOpenNotification('warning', 'bottomLeft')}
                    >
                        Warning
                    </Button>
                    <Button
                        type="primary"
                        onClick={() => this.handleOpenNotification('error', 'bottomRight')}
                    >
                        Error
                    </Button>
                </Card>
            </div>
        );
    }
}

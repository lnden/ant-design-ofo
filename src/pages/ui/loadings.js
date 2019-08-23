import React, { Component } from 'react'
import { Card, Spin, Icon, Alert } from 'antd'

export default class Loadings extends Component {
    render() {
        const icon = <Icon type="loading" style={{ fontSize: 24 }} />;//只能是静态图标GIT图
        const plus = <Icon type="plus" style={{ fontSize: 24 }} />;//只能是静态图标GIT图

        return (
            <div>
                <Card title="Spin用法">
                    <Spin size="small" />
                    <Spin size="default" />
                    <Spin size="large" />
                    <Spin indicator={icon} />
                    <Spin indicator={plus} />
                </Card>
                <Card title="内容遮罩">
                    <Alert
                        message="React"
                        description="欢迎深入学习"
                        type="info"
                    />
                    <Spin>
                        <Alert
                            message="React"
                            description="欢迎深入学习"
                            type="warning"
                        />
                    </Spin>
                    <Spin tip="加载中···">
                        <Alert
                            message="React"
                            description="欢迎深入学习"
                            type="warning"
                        />
                    </Spin>
                    <Spin tip="加载中···" indicator={icon}>
                        <Alert
                            message="React"
                            description="欢迎深入学习"
                            type="warning"
                        />
                    </Spin>
                </Card>
            </div>
        )
    }

}
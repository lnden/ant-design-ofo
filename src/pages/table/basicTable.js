import React, { Component } from 'react'
import { Card, Table } from 'antd'

export default class BasicTable extends Component {

    state = {}

    componentDidMount() {
        const dataSource = [
            {
                id: '0',
                userName: 'Jack',
                sex: '1',
                state: '2',
                interest: '1',
                birthday: '2002-01-01',
                address: '黑龙江省七台河市',
                time: '09:00'
            },
            {
                id: '1',
                userName: 'Lucy',
                sex: '2',
                state: '1',
                interest: '2',
                birthday: '2000-01-01',
                address: '北京市昌平区',
                time: '09:00'
            },
            {
                id: '2',
                userName: 'Tom',
                sex: '1',
                state: '1',
                interest: '2',
                birthday: '2004-01-01',
                address: '天津市北辰区',
                time: '09:00'
            }
        ]
        this.setState({ dataSource })
    }

    render() {
        const columns = [
            {
                title: 'Id',
                dataIndex: 'id'
            },
            {
                title: '用户名',
                dataIndex: 'userName'
            },
            {
                title: '性别',
                dataIndex: 'sex'
            },
            {
                title: '状态',
                dataIndex: 'state'
            },
            {
                title: '爱好',
                dataIndex: 'interest'
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                dataIndex: 'time'
            },
        ]
        return (
            <div>
                <Card title="基础表格">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                    />
                </Card>
            </div>
        )
    }
}
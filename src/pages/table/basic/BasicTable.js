import React, {Component} from 'react'
import {Table} from 'antd'
import columns from './columns'

export default class BasicTable extends Component {

    state = {
        dataSource: [],
    }

    componentDidMount() {
        const dataSource = [
            {
                id: 0,
                userName: 'Jack',
                sex: 1,
                state: 2,
                interest: 1,
                birthday: '2002-01-01',
                address: '黑龙江省七台河市',
                time: '09:00',
                key: '11'
            },
            {
                id: '1',
                userName: 'Lucy',
                sex: 2,
                state: 1,
                interest: 2,
                birthday: '2000-01-01',
                address: '北京市昌平区',
                time: '09:00',
                key: '22'
            },
            {
                id: '2',
                userName: 'Tom',
                sex: 1,
                state: 1,
                interest: 2,
                birthday: '2004-01-01',
                address: '天津市北辰区',
                time: '09:00',
                key: '33'
            }
        ]
        this.setState({dataSource})
    }

    render() {
        const {dataSource} = this.state;
        return (
            <Table
                bordered
                columns={columns}
                dataSource={dataSource}
                pagination={false}
            />
        )
    }
}
import React, {Component} from 'react'
import {Table} from 'antd'

export default class SortTable extends Component {

    state = {
        // sortOrder: "ascend",
        sortOrder: "descend"
    };

    hanldeChange = (pagination, filters, sorter) => {
        this.setState({
            sortOrder: sorter.order
        })
    };

    render() {
        const columns = [
            {
                title: 'Id',
                dataIndex: 'id',
            },
            {
                title: '用户名',
                dataIndex: 'userName',
            },
            {
                title: '年龄',
                dataIndex: 'age',
                sorter: (a, b) => {
                    return a.age - b.age;
                },
                sortOrder:this.state.sortOrder

            },
            {
                title: '生日',
                dataIndex: 'birthday',
            },
            {
                title: '地址',
                dataIndex: 'address',
            },
            {
                title: '早起时间',
                dataIndex: 'time',
            },
        ];
        return (
            <Table
                bordered
                columns={columns}
                dataSource={this.props.dataSource}
                pagination={false}
                onChange={this.hanldeChange}
            />
        )
    }
}
import React, {Component} from 'react'
import {Table} from 'antd'

export default class HeadFiexd extends Component {
    render() {
        const columns = [
            {
                title: 'Id',
                dataIndex: 'id',
                width: 120,
            },
            {
                title: '用户名',
                dataIndex: 'userName',
                width: 120,
            },
            {
                title: '年龄',
                dataIndex: 'age',
                width: 120,
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 120
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: 120
            },
            {
                title: '早起时间',
                dataIndex: 'time',
                width: 120,
            }
        ];
        return (
            <Table
                bordered
                columns={columns}
                dataSource={this.props.dataSource}
                pagination={false}
                scroll={{y: 240}}//使用scroll定义表格高度，此时出现表头和表格内容宽度不一致，需要定义columns的宽度
            />
        )
    }
}
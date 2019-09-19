import React, { Component } from 'react';
import { Table } from 'antd';

export default class SideFiexd extends Component {
    render() {
        const columns = [
            {
                title: 'Id',
                dataIndex: 'id',
                width: 80,
                fixed: 'left',
            },
            {
                title: '用户名',
                dataIndex: 'userName',
                width: 80,
                fixed: 'left',
            },
            {
                title: '年龄',
                dataIndex: 'age',
                width: 60,
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 120,
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: 120,
            },
            {
                title: '地址1',
                dataIndex: 'address1',
                width: 120,
            },
            {
                title: '地址2',
                dataIndex: 'address2',
                width: 120,
            },
            {
                title: '地址3',
                dataIndex: 'address3',
                width: 120,
            },
            {
                title: '地址4',
                dataIndex: 'address4',
                width: 120,
            },
            {
                title: '地5',
                dataIndex: 'address5',
                width: 120,
            },
            {
                title: '地址6',
                dataIndex: 'address6',
                width: 120,
            },
            {
                title: '地址7',
                dataIndex: 'address7',
                width: 120,
            },
            {
                title: '地址8',
                dataIndex: 'address8',
                width: 120,
            },
            {
                title: '地址9',
                dataIndex: 'address9',
                width: 120,
            },
            {
                title: '早起时间',
                dataIndex: 'time',
                width: 120,
                fixed: 'right',
            },
        ];
        const { dataSource } = this.props;
        return (
            <Table
                bordered
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                scroll={{ x: 1660 }} // 宽度累加起来的总合
            />
        );
    }
}

import React, { Component } from 'react';
import { Table } from 'antd';
import Utils from '../../utils/utils';

export default class Tables extends Component {
    handleChange = values => {
        const { handleSearch } = this.props;
        handleSearch();
    };

    render() {
        const columns = [
            {
                title: '城市ID',
                dataIndex: 'id',
            },
            {
                title: '城市名称',
                dataIndex: 'name',
            },
            {
                title: '用车模式',
                dataIndex: 'mode',
                render(mode) {
                    return mode === 1 ? '停车点' : '禁停区';
                },
            },
            {
                title: '运营模式',
                dataIndex: 'op_mode',
                render(op_mode) {
                    return op_mode === 1 ? '自营' : '加盟';
                },
            },
            {
                title: '授权加盟商',
                dataIndex: 'franchisee_name',
            },
            {
                title: '城市管理员',
                dataIndex: 'city_admins',
                render(arr) {
                    return arr
                        .map(item => {
                            return item.user_name;
                        })
                        .join('，');
                },
            },
            {
                title: '城市开通时间',
                dataIndex: 'open_time',
            },
            {
                title: '操作时间',
                dataIndex: 'update_time',
                render: Utils.formateDate,
            },
            {
                title: '操作人',
                dataIndex: 'sys_user_name',
            },
        ];
        const { dataSource, pagination } = this.props;
        return (
            <Table
                columns={columns}
                dataSource={dataSource}
                pagination={pagination}
                onChange={this.handleChange}
            />
        );
    }
}

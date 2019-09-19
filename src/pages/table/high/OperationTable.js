import React, { Component } from 'react';
import { Table, Badge, Button, Modal, message } from 'antd';

export default class OpeartionTable extends Component {
    handleDelete = item => {
        Modal.confirm({
            title: '确认',
            content: `您确认要删除 ${item.userName} 的数据吗?`,
            onOk: () => {
                message.success('删除成功');
            },
            onCancel: () => {
                message.warning('取消删除');
            },
        });
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
            },
            {
                title: '状态',
                dataIndex: 'state',
                render(state) {
                    const config = {
                        1: <Badge status="success" text="成功" />,
                        2: <Badge status="error" text="错误" />,
                        3: <Badge status="default" text="正常" />,
                        4: <Badge status="processing" text="进行中" />,
                        5: <Badge status="warning" text="警告" />,
                    };
                    return config[state];
                },
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
            {
                title: '操作',
                render: item => {
                    return (
                        <Button size="small" onClick={this.handleDelete(item)}>
                            删除
                        </Button>
                    );
                },
            },
        ];
        const { dataSource } = this.props;
        return <Table bordered columns={columns} dataSource={dataSource} pagination={false} />;
    }
}

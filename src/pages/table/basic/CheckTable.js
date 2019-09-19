import React, { Component } from 'react';
import { Table, Button, Modal, message } from 'antd';
import columns from './columns';

export default class CheckTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            selectedRows: null,
        };
    }

    // 多选执行删除动作
    hanldeDelete = () => {
        const {
            selectedRows: { row },
        } = this.state;
        //  const row = this.state.selectedRows;
        const { handleClickDelete } = this.props;
        const ids = [];
        row.map(item => ids.push(item.id));
        Modal.confirm({
            title: '删除提示',
            content: `您确定要删除这些数据吗?${ids.join(',')}`,
            onOk: () => {
                message.success('恭喜您删除成功~');
                handleClickDelete();
            },
        });
    };

    render() {
        const { selectedRowKeys } = this.state;
        const { dataSource } = this.props;
        const rowCheckSelection = {
            type: 'checkbox',
            selectedRowKeys,
            onChange: (selectedRowKeyss, selectedRows) => {
                this.setState({
                    selectedRowKeys: selectedRowKeyss,
                    selectedRows,
                });
            },
        };
        return (
            <div>
                <div>
                    <Button onClick={this.hanldeDelete}>删除</Button>
                </div>
                <Table
                    rowSelection={rowCheckSelection}
                    columns={columns}
                    dataSource={dataSource}
                    pagination={false}
                />
            </div>
        );
    }
}

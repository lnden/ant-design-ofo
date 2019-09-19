import React, { Component } from 'react';
import { Table } from 'antd';
import columns from './columns';

export default class RadioTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRowKeys: [],
            // selectedItem: [],
        };
    }

    onRowClick = (record, index) => {
        const selectKey = [index];
        this.setState({
            selectedRowKeys: selectKey, // 选中索引
            // selectedItem: record, // 选中字段
        });
    };

    render() {
        const { selectedRowKeys } = this.state;
        const { dataSource } = this.props;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys,
        };
        return (
            <Table
                bordered
                rowSelection={rowSelection}
                onRow={(record, index) => {
                    return {
                        onClick: () => {
                            this.onRowClick(record, index);
                        },
                        // onMouseEnter: () => { }//鼠标移入行
                    };
                }}
                columns={columns}
                dataSource={dataSource}
                pagination={false}
            />
        );
    }
}

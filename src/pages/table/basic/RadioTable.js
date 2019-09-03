import React, {Component} from 'react'
import {Table} from 'antd'
import columns from './columns'

export default class RadioTable extends Component {
    state = {
        selectedRowKeys:[],
        selectedItem:[]
    }

    onRowClick = (record, index) => {
        let selectKey = [index]
        this.setState({
            selectedRowKeys: selectKey,//选中索引
            selectedItem: record//选中字段
        })
    }

    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }
        return (
            <Table
                bordered
                rowSelection={rowSelection}
                onRow={(record, index) => {
                    return {
                        onClick: () => {
                            this.onRowClick(record, index)
                        },//点击
                        //onMouseEnter: () => { }//鼠标移入行
                    }
                }}
                columns={columns}
                dataSource={this.props.dataSource}
                pagination={false}
            />
        )
    }
}
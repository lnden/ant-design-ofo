import React, {Component} from 'react'
import {Table, Button, Modal, message} from 'antd'
import columns from "./columns";

export default class CheckTable extends Component {
    state = {
        selectedRowKeys: [],
        selectedRows: null
    }


    //多选执行删除动作
    hanldeDelete = () => {
        let row = this.state.selectedRows;
        let ids = [];
        row.map((item) => {
            ids.push(item.id)
        });
        Modal.confirm({
            title: '删除提示',
            content: `您确定要删除这些数据吗?${ids.join(',')}`,
            onOk: () => {
                message.success('恭喜您删除成功~')
                this.props.handleClickDelete()
            }
        })
    }

    render() {
        const {selectedRowKeys} = this.state;
        const rowCheckSelection = {
            type: 'checkbox',
            selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    selectedRowKeys,
                    selectedRows,
                })
            }
        }
        return (
            <div>
                <div>
                    <Button onClick={this.hanldeDelete}>删除</Button>
                </div>
                <Table
                    rowSelection={rowCheckSelection}
                    columns={columns}
                    dataSource={this.props.dataSource}
                    pagination={false}
                />
            </div>

        )
    }
}
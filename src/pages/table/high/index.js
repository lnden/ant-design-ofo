import React, { Component } from 'react'
import { Card, Table } from 'antd'
import columns from '../columns'
import axios from '../../../utils/request'

export default class Hightable extends Component {

    state = {
        dataSource: [],
        sortOrder:''
    }

    params = {
        page: 1
    }

    componentDidMount() {
        this.requestList()
    }

    requestList = () => {
        let _this = this;
        axios.ajax({
            url: '/table/list',
            data: {
                params: {
                    page: this.params.page
                },
                isShowLoading: true
            }
        }).then(res => {
            if (res.code === 0) {
                res.result.list.map((item, index) => item.key = index)
                this.setState({
                    dataSource: res.result.list
                })
            }
        })
    };


    hanldeChange = (pagination, filters, sorter) => {
        console.log(sorter.order,1111)
        this.setState({
            sortOrder: sorter.order
        })
    }

    render() {
        return (
            <div>
                <Card title="头部固定">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        scroll={{ y: 240 }}//使用scroll定义表格高度，此时出现表头和表格内容宽度不一致，需要定义columns的宽度
                    />
                </Card>
                <Card title="左侧固定">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                        scroll={{ x: 2040 }}//宽度累加起来的总合
                        onChange={this.hanldeChange}
                    />
                </Card>
                <Card title="表格排序">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                       
                    />
                </Card>
                <Card title="操作表格">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                    />
                </Card>
            </div>
        )
    }
}
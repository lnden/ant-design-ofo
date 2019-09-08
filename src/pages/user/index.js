import React, { Component } from 'react'
import { Card, Button } from 'antd'
import axios from '../../utils/request'
import Utils from '../../utils/utils'
import BaseForm from '../../components/BaseForm'
import formList from './map'

export default class User extends Component {

    state = {
        dataSource: [],
        pagination: null,
        selectedRowKeys:'',
        selectedItem:[]
    }
    handleFilter = (params) => {
        console.log('请求数据')
        // this.params = params;
        // this.requestList()
    }

    render() {
        const { dataSource } = this.state;
        return (
            <Card title="员工管理">
                <BaseForm layout="inline" formList={formList} filterSubmit={this.handleFilter} />
                <BaseTable
                    updateSelectedItem={}
                    columns={columns}
                    dataSource={dataSource}
                    selectedRowKeys={selectedRowKeys}
                    selectedItem={selectedItem}
                    pagination={pagination}
                />
            </Card>
        )
    }
}
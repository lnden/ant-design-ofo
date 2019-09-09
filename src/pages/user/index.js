import React, { Component } from 'react'
import { Card, Button } from 'antd'
import axios from '../../utils/request'
import Utils from '../../utils/utils'
import BaseForm from '../../components/BaseForm'
import BaseTable from '../../components/BaseTable'
import formList from './map'
import columns from './columns'

export default class User extends Component {

    state = {
        dataSource: [],
        pagination: null,
        selectedRowKeys:'',
        selectedItem:[]
    }

    params = {
        page: 1
    }

    handleFilter = (params) => {
        console.log('请求数据')
        // this.params = params;
        // this.requestList()
    }

    componentDidMount(){
        this.requestList()
    }

    requestList = () => {
        console.log(111)
        axios.requestList(this,'order/list',this.params,true)
    }

    render() {
        const { dataSource } = this.state;
        return (
            <Card title="员工管理">
                <BaseForm layout="inline" formList={formList} filterSubmit={this.handleFilter} />
                <BaseTable
                    updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                    columns={columns}
                    dataSource={dataSource}
                    pagination={false}
                />
            </Card>
        )
    }
}
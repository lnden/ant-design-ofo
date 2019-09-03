import React, {Component} from 'react'
import {Card} from 'antd'
import axios from '../../../utils/request'
import HeadFixed from './HeadFixed'
import SideFixed from './SideFixed'
import SortTable from './SortTable'
import OperationTable from './OperationTable'

export default class Hightable extends Component {

    state = {
        dataSource: [],
    };

    params = {
        page: 1
    };

    componentDidMount() {
        this.requestList()
    }

    requestList = () => {
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


    render() {
        const {dataSource} = this.state;
        return (
            <div>
                <Card title="头部固定">
                    <HeadFixed dataSource={dataSource}/>
                </Card>
                <Card title="两侧固定">
                    <SideFixed dataSource={dataSource}/>
                </Card>
                <Card title="表格排序">
                    <SortTable dataSource={dataSource}/>
                </Card>
                <Card title="操作表格">
                    <OperationTable dataSource={dataSource}/>
                </Card>
            </div>
        )
    }
}
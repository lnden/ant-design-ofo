import React, {Component} from 'react'
import {Card, Table} from 'antd'
import axios from './../../utils/request'
import RenderTable from './RenderTable'
import RadioTable from './RadioTable'
import columns from './columns'

export default class BasicTable extends Component {

    state = {
        dataSource: [],
        dataSource2:[]
    }

    componentDidMount() {
        const dataSource2 = [
            {
                id: 0,
                userName: 'Jack',
                sex: 1,
                state: 2,
                interest: 1,
                birthday: '2002-01-01',
                address: '黑龙江省七台河市',
                time: '09:00',
                key: '11'
            },
            {
                id: '1',
                userName: 'Lucy',
                sex: 2,
                state: 1,
                interest: 2,
                birthday: '2000-01-01',
                address: '北京市昌平区',
                time: '09:00',
                key: '22'
            },
            {
                id: '2',
                userName: 'Tom',
                sex: 1,
                state: 1,
                interest: 2,
                birthday: '2004-01-01',
                address: '天津市北辰区',
                time: '09:00',
                key: '33'
            }
        ]
        this.setState({dataSource2})
        this.request()
    }

    //动态获取mock数据
    request = () => {
        // const baseUrl = "https://www.easy-mock.com/mock/5d5ec2393da1210743354970/v1"
        // axios.get(`${baseUrl}/table/list`).then((res) => {
        //     if (res.status === 200 && res.data.code === 0) {
        //         console.log(res.data.result,1111)
        //         this.setState({
        //             dataSource2: res.data.result
        //         })
        //     }
        // })
        axios.ajax({
            url: '/table/list',
            data: {
                params: {
                    page: 1
                },
                isShowLoading: true
            }
        }).then(res => {
            if (res.code === 0) {
                res.result.map((item, index) => {
                    item.key = index
                })
                this.setState({
                    dataSource:res.result
                })
            }
        })
    }


    render() {
        const {dataSource} = this.state;
        return (
            <div>
                <Card title="基础表格">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
                <Card title="动态数据渲染表格 easy mock">
                    <RenderTable dataSource={dataSource}/>
                </Card>
                <Card title="Mock-单选 动态数据渲染表格">
                    <RadioTable dataSource={dataSource}/>
                </Card>
            </div>
        )
    }
}
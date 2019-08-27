import React, { Component } from 'react'
import { Card, Table } from 'antd'
import axios from './../../utils/request'
export default class BasicTable extends Component {

    state = {
        dataSource2: []
    }

    componentDidMount() {
        const dataSource = [
            {
                id: '0',
                userName: 'Jack',
                sex: '1',
                state: '2',
                interest: '1',
                birthday: '2002-01-01',
                address: '黑龙江省七台河市',
                time: '09:00',
                key: '11'
            },
            {
                id: '1',
                userName: 'Lucy',
                sex: '2',
                state: '1',
                interest: '2',
                birthday: '2000-01-01',
                address: '北京市昌平区',
                time: '09:00',
                key: '22'
            },
            {
                id: '2',
                userName: 'Tom',
                sex: '1',
                state: '1',
                interest: '2',
                birthday: '2004-01-01',
                address: '天津市北辰区',
                time: '09:00',
                key: '33'
            }
        ]
        this.setState({ dataSource })
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
                    dataSource2: res.result
                })
            }
        })
    }

    onRowClick = (record, index) => {
        console.log(record,index)
        let selectKey = [index]
        this.setState({
            selectedRowKeys: selectKey,//选中索引
            selectedItem: record//选中字段
        })
    }

    render() {
        const columns = [
            {
                title: 'Id',
                dataIndex: 'id'
            },
            {
                title: '用户名',
                dataIndex: 'userName'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render(sex) {
                    return sex === 1 ? '男' : '女'
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
                render(state) {
                    let config = {
                        '1': '进行时',
                        '2': '将来时',
                        '3': '过去时',
                        '4': '过去进行时',
                        '5': 'oye'
                    }
                    return config[state]
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                render(interest) {
                    let config = {
                        '1': '游泳',
                        '2': '打篮球',
                        '3': '踢足球',
                        '4': '跑步',
                        '5': '爬山',
                        '6': '骑行',
                        '7': '桌球',
                        '8': '麦霸'
                    }
                    return config[interest]
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday'
            },
            {
                title: '地址',
                dataIndex: 'address'
            },
            {
                title: '早起时间',
                dataIndex: 'time'
            },
        ]
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys
        }
        return (
            <div>
                <Card title="基础表格">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false}
                    />
                </Card>
                <Card title="动态数据渲染表格 easy mock">
                    <Table
                        bordered
                        columns={columns}
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
                <Card title="Mock-单选 动态数据渲染表格">
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
                        dataSource={this.state.dataSource2}
                        pagination={false}
                    />
                </Card>
            </div>
        )
    }
}
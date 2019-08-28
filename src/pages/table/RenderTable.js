import React, {Component} from 'react'
import {Table} from 'antd'
import axios from "../../utils/request";
import {genderFilter,interestFilters, statusFilter, interestFilter} from '../../utils/filter'

export default class RenderTable extends Component {
    state = {
        dataSource: []
    };

    componentDidMount() {
        this.request()
    }

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
                    dataSource: res.result
                })
            }
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
                    return genderFilter(sex)
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
                render(state) {
                    return statusFilter(state)
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                render(interest) {
                    return interestFilter(interest)
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
        return (
            <Table
                bordered
                columns={columns}
                dataSource={this.state.dataSource}
                pagination={false}
            />
        )
    }
}
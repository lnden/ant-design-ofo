import React, { Component } from 'react';
import { Card } from 'antd';
import axios from '../../../utils/request';
import BasicTable from './BasicTable';
import RenderTable from './RenderTable';
import RadioTable from './RadioTable';
import CheckTable from './CheckTable';
import Paginations from './Paginations';
import Utils from '../../../utils/utils';

export default class Tables extends Component {
    params = {
        page: 1,
    };

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
        };
    }

    componentDidMount() {
        this.requestList();
    }

    // 动态获取mock数据
    requestList = () => {
        // const baseUrl = "https://www.easy-mock.com/mock/5d5ec2393da1210743354970/v1"
        // axios.get(`${baseUrl}/table/list`).then((res) => {
        //     if (res.status === 200 && res.data.code === '0') {
        //         console.log(res.data.result,1111)
        //         this.setState({
        //             dataSource2: res.data.result
        //         })
        //     }
        // })
        axios
            .ajax({
                url: '/table/list',
                data: {
                    params: {
                        page: this.params.page,
                    },
                    isShowLoading: true,
                },
                isMock: false,
            })
            .then(res => {
                const data = res.result.list;
                this.setState({
                    dataSource: Utils.formateDataList(data),
                    // selectedRowKeys: [],
                    // selectedRows: null,
                    pagination: Utils.pagination(res, current => {
                        this.params.page = current;
                        this.requestList();
                    }),
                });
            });
    };

    handleClickDelete = () => {
        this.requestList();
    };

    render() {
        const { dataSource, pagination } = this.state;
        return (
            <div>
                <Card title="基础表格">
                    <BasicTable />
                </Card>
                <Card title="动态数据渲染表格 easy mock">
                    <RenderTable dataSource={dataSource} />
                </Card>
                <Card title="Mock-单选 动态数据渲染表格">
                    <RadioTable dataSource={dataSource} />
                </Card>
                <Card title="Mock-复选 动态数据渲染表格">
                    <CheckTable
                        handleClickDelete={this.handleClickDelete}
                        dataSource={dataSource}
                    />
                </Card>
                <Card title="Mock-pagination 动态数据渲染表格">
                    <Paginations dataSource={dataSource} pagination={pagination} />
                </Card>
            </div>
        );
    }
}
//  此为分页
//  <Table
//      bordered
//      columns={columns}
//      dataSource={dataSource}
//      pagination={this.state.pagination}
//  />

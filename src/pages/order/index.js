import React, { Component } from 'react'
import { Card, Button, Divider, Modal } from 'antd'
import FilterForm from './FilterForm'
import Tables from './Tables'
import { requestDateList, requestDetail, requestFinish } from "../../services/order";
import Utils from "../../utils/utils";

export default class Order extends Component {

    state = {
        dataSource: []
    }

    params = {
        page: 1
    };

    componentDidMount() {
        this.requestList()
    }

    requestList() {
        requestDateList(this.params, true).then(res => {
            if (res.code === '0') {
                res.result.list.map((item, index) => item.key = index);
                this.setState({
                    dataSource: res.result.list,
                    pagination: Utils.pagination(res, (current) => {
                        this.params.page = current;
                    })
                })
            }
        })
    }

    handleDetail = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: '信息',
                content: '请先选择一条订单'
            })
            return;
        }
        window.open(`/#/order/detail/${item.id}`, '_blank')
    }

    handleFinish = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: '信息',
                content: '请选择一条订单进行结束'
            })
            return;
        }
        requestDetail(this.params).then(res => {
            if (res.code === '0') {
                this.setState({
                    orderInfo: res.result,
                    orderConfirmVisble: true
                })
            }
        })
    }
    render() {
        const { dataSource, pagination } = this.state;
        return (
            <div>
                <Card>
                    <FilterForm />
                    <Divider type="horizontal" />
                    <Button type="primary" onClick={this.handleDetail}>订单详情</Button>
                    <Button type="primary" onClick={this.handleFinish}>结束订单</Button>
                    <Divider type="horizontal" />
                    <Tables dataSource={dataSource} pagination={pagination} />
                </Card>
            </div>
        )
    }
}
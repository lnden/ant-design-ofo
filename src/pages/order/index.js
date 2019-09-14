import React, { Component } from 'react'
import { Card, Table, Button, Divider, Modal, message, Form } from 'antd'
import FilterForm from './FilterForm'
import columns from './columns'
import { getList, getDetail, getFinish } from "../../services/order";
import Utils from "../../utils/utils";
import BasicForm from '../../components/BaseForm'
import filterMap from './map'
import axios from '../../utils/request'

const FormItem = Form.Item;
export default class Order extends Component {

    state = {
        dataSource: [],
        orderInfo:{},
        orderConfirmVisble: false,
        selectedRowKeys:[2]
    }

    params = {
        page: 1
    };

    componentDidMount() {
        // this.requestList()
        axios.requestList(this,'order/list',this.params,true)
    }

    // 获取数据列表
    requestList() {
        getList(this.params, true).then(res => {
            console.log(res)
            res.result.list.map((item, index) => item.key = index);
            this.setState({
                dataSource: res.result.list,
                pagination: Utils.pagination(res, (current) => {
                    this.params.page = current;
                })
            })
        })
    }

    // 点击订单详情
    handleDetail = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: '信息',
                content: '请先选择一条订单'
            })
            return;
        }
        window.open(`/#/common/order/detail/${item.id}`,'_blank');
    }

    // 点击结束订单
    handleFinish = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: '信息',
                content: '请选择一条订单进行结束'
            })
            return;
        }
        getDetail(this.params).then(res => {
            this.setState({
                orderInfo: res.result,
                orderConfirmVisble: true
            })
        })
    }

    // 确认结束订单
    handleFinishOrder = () => {
        getFinish(this.params).then((res) => {
            message.success('订单结束成功')
            this.setState({
                orderConfirmVisble: false
            })
            this.requestList();
        })
    }

    onSelectChange = (index, item) => {
        console.log('获取下标和该行数据：', index, item);
        this.setState({
            selectedItem:item,
            selectedRowKeys:index
        })
    }


    searchBtn = (values) => {
        Object.assign(this.params,values);
        this.requestList()
    }

    handleFilter = (params) =>{
        console.log(params)
        this.params = params;
        this.requestList()
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 }
        }

        const { dataSource, pagination, orderConfirmVisble, orderInfo, selectedRowKeys } = this.state;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <div>
                <Card>
                    <FilterForm handleSearch={this.searchBtn}/>
                    <BasicForm layout="inline" formList={filterMap} filterSubmit={this.handleFilter}/>
                    <Divider type="horizontal" />
                    <Button type="primary" onClick={this.handleDetail}>订单详情</Button>
                    <Button type="primary" onClick={this.handleFinish}>结束订单</Button>
                    <Divider type="horizontal" />
                    <Table
                        columns={columns}
                        dataSource={dataSource}
                        pagination={pagination}
                        rowSelection={rowSelection}
                    />
                    <Modal
                        title="结束订单"
                        visible={orderConfirmVisble}
                        onCancel={() => {
                            this.setState({
                                orderConfirmVisble: false
                            })
                        }}
                        onOk={this.handleFinishOrder}
                        width={600}
                    >
                        <Form layout="horizontal">
                            <FormItem label="车辆编号" {...formItemLayout}>
                                {orderInfo.bike_sn}
                            </FormItem>
                            <FormItem label="剩余电量" {...formItemLayout}>
                                {orderInfo.battery + '%'}
                            </FormItem>
                            <FormItem label="行程开始时间" {...formItemLayout}>
                                {orderInfo.start_time}
                            </FormItem>
                            <FormItem label="当前位置" {...formItemLayout}>
                                {orderInfo.location}
                            </FormItem>
                        </Form>
                    </Modal>
                </Card>
            </div>
        )
    }
}
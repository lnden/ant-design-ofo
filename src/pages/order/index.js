import React, { Component } from 'react';
import { Card, Table, Button, Divider, Modal, message, Form } from 'antd';
import FilterForm from './FilterForm';
import columns from './columns';
import { getDetail, getFinish } from '../../services/order';
import axios from '../../utils/request';

const FormItem = Form.Item;
export default class Order extends Component {
    params = {
        page: 1,
    };

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            orderInfo: {},
            orderConfirmVisble: false,
            selectedRowKeys: [2],
        };
    }

    componentDidMount() {
        this.requestList();
    }

    // 点击订单详情
    handleDetail = () => {
        const { selectedItem } = this.state;
        const { history } = this.props;
        if (!selectedItem) {
            Modal.info({
                title: '信息',
                content: '请先选择一条订单',
            });
            return;
        }
        // window.open(`/#/common/order/detail/${item.id}`,'_blank');
        history.push(`/common/order/detail/${selectedItem.id}`);
    };

    // 点击结束订单
    handleFinish = () => {
        const { selectedItem } = this.state;
        if (!selectedItem) {
            Modal.info({
                title: '信息',
                content: '请选择一条订单进行结束',
            });
            return;
        }
        getDetail(this.params).then(res => {
            this.setState({
                orderInfo: res.result,
                orderConfirmVisble: true,
            });
        });
    };

    // 确认结束订单
    handleFinishOrder = () => {
        getFinish(this.params, true).then(res => {
            message.success('订单结束成功');
            this.setState({
                orderConfirmVisble: false,
            });
            this.requestList();
        });
    };

    onSelectChange = (index, item) => {
        // console.log('获取下标和该行数据：', index, item);
        this.setState({
            selectedItem: item[0],
            selectedRowKeys: index,
        });
    };

    searchBtn = values => {
        this.params = [...values];
        this.requestList();
    };

    // 获取数据列表
    requestList() {
        axios.requestList(this, 'order/list', this.params, false);
    }

    render() {
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 },
        };

        const {
            dataSource,
            pagination,
            orderConfirmVisble,
            orderInfo,
            selectedRowKeys,
        } = this.state;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return (
            <div>
                <Card>
                    <FilterForm handleSearch={this.searchBtn} />
                    <Divider type="horizontal" />
                    <Button type="primary" onClick={this.handleDetail}>
                        订单详情
                    </Button>
                    <Button type="primary" onClick={this.handleFinish}>
                        结束订单
                    </Button>
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
                                orderConfirmVisble: false,
                            });
                        }}
                        onOk={this.handleFinishOrder}
                        width={600}
                    >
                        <Form layout="horizontal">
                            <FormItem label="车辆编号" {...formItemLayout}>
                                {orderInfo.bike_sn}
                            </FormItem>
                            <FormItem label="剩余电量" {...formItemLayout}>
                                {`${orderInfo.battery}%`}
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
        );
    }
}

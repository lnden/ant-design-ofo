import React, {Component} from 'react'
import {Card, Button, Divider} from 'antd'
import FilterForm from './FilterForm'
import Tables from './Tables'
import {tableDate} from "../../services/order";
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
        tableDate(this.params, true).then(res => {
            if (res.code === 0) {
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

    render() {
        const {dataSource, pagination} = this.state;
        return (
            <div>
                <Card>
                    <FilterForm/>
                    <Divider type="horizontal"/>
                    <Button type="primary">订单详情</Button>
                    <Button type="primary">结束订单</Button>
                    <Divider type="horizontal"/>
                    <Tables dataSource={dataSource} pagination={pagination}/>
                </Card>
            </div>
        )
    }
}
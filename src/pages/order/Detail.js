import React, {Component} from 'react';
import {Card} from 'antd'
import {requestDetailInfo} from "../../services/order";

export default class Detail extends Component {

    state = {}


    componentDidMount() {
        let orderId = {id:123456};
        // let orderId = this.props.match.params.orderId;
        if (orderId) {
            this.getDetailInfo(orderId)
        }
    }

    getDetailInfo(orderId) {
        requestDetailInfo(orderId).then(res => {
            if (res.code === 0) {
                this.setState({
                    orderInfo: res.result
                })
            }
        })
    }

    render() {
        const {mode, order_sn, bike_sn, user_name, mobile, start_location, end_location, distance} = this.state.orderInfo || {}
        return (
            <div>
                <Card>
                    <div id="orderDetailMap"></div>
                    <div className="detail-items">
                        <div className="item-title">基础信息</div>
                        <div className="detail-form">
                            <li>
                                <div className="detail-form-left">用车模式</div>
                                <div className="detail-form-content">{mode == 1 ? '服务区' : '停车点'}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">订单编号</div>
                                <div className="detail-form-content">{order_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">车辆编号</div>
                                <div className="detail-form-content">{bike_sn}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">用车姓名</div>
                                <div className="detail-form-content">{user_name}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">手机号码</div>
                                <div className="detail-form-content">{mobile}</div>
                            </li>
                        </div>
                    </div>

                    <div className="detail-items">
                        <div className="item-title">行驶轨迹</div>
                        <div className="detail-form">
                            <li>
                                <div className="detail-form-left">行程起点</div>
                                <div className="detail-form-content">{start_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行程终点</div>
                                <div className="detail-form-content">{end_location}</div>
                            </li>
                            <li>
                                <div className="detail-form-left">行程里程</div>
                                <div className="detail-form-content">{distance / 1000}公里</div>
                            </li>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }
}
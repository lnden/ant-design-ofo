import React, { Component } from 'react';
import { Card } from 'antd';
import { getDetailInfo } from '../../services/order';
import './detail.less';

export default class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderInfo: {},
        };
    }

    componentDidMount() {
        const orderId = { id: 123456 };
        // let orderId = this.props.match.params.orderId;
        if (orderId) {
            getDetailInfo(orderId).then(res => {
                this.setState({
                    orderInfo: res.result,
                });
                this.renderMap();
            });
        }
    }

    renderMap = () => {
        this.map = new window.BMap.Map('orderDetailMap');
        // this.map.centerAndZoom('北京', 11);
        this.addMapControl();
        this.drawBikeRoute();
        this.drawRoute();
        this.drawServiceArea();
    };

    // 添加地图控件
    addMapControl = () => {
        const { map } = this;
        // 缩放控件
        map.addControl(new window.BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));
        // 导航控件
        map.addControl(new window.BMap.NavigationControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT }));
    };

    // 绘制用户起始坐标
    drawBikeRoute = () => {
        const { map } = this;
        const {
            orderInfo: { position_list },
        } = this.state;
        const { history } = this.props;

        let startPoint = '';
        let endPoint = '';
        let startIcon = '';
        let endIcon = '';
        let startMarker = '';
        let endMarker = '';

        if (position_list.length > 0) {
            const first = position_list[0];
            const last = position_list[position_list.length - 1];

            // 开始坐标点
            startPoint = new window.BMap.Point(first.lon, first.lat);
            startIcon = new window.BMap.Icon(
                '/assets/start_point.png',
                new window.BMap.Size(36, 42),
                {
                    imageSize: new window.BMap.Size(36, 42),
                    anchor: new window.BMap.Size(18, 42),
                },
            );
            startMarker = new window.BMap.Marker(startPoint, { icon: startIcon });

            // 点击页面某点跳转并且获取相关ID值start
            const labels = new window.BMap.Label('20190917', {
                offset: new window.BMap.Size(20, 0),
            });
            labels.setStyle({ display: 'none' });
            startMarker.setLabel(labels);
            startMarker.setTitle('ID值');
            map.addOverlay(startMarker);
            startMarker.addEventListener('click', e => {
                const id = e.target.getLabel().content;
                history.push(`/${id}`);
            });

            // 结束坐标点
            endPoint = new window.BMap.Point(last.lon, last.lat);
            endIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {
                imageSize: new window.BMap.Size(36, 42),
                anchor: new window.BMap.Size(18, 42),
            });
            endMarker = new window.BMap.Marker(endPoint, { icon: endIcon });
            map.addOverlay(endMarker);

            map.centerAndZoom(endPoint, 11);
        }
    };

    // 绘制路线
    drawRoute = () => {
        const { map } = this;
        const {
            orderInfo: { position_list },
        } = this.state;
        const trackPoint = this.formatPoint(position_list);
        const polyline = new window.BMap.Polyline(trackPoint, {
            strokeColor: '#1869AD',
            strokeWeight: 3,
            strokeOpacity: 1,
        });
        map.addOverlay(polyline);
    };

    // 绘制服务区
    drawServiceArea = () => {
        const { map } = this;
        const {
            orderInfo: { area },
        } = this.state;
        const trackPoint = this.formatPoint(area);
        const polygon = new window.BMap.Polygon(trackPoint, {
            strokeColor: '#CE0000',
            strokeWeight: 3,
            strokeOpacity: 1,
            fillColor: '#ff8605',
            fillOpacity: 0.4,
        });
        map.addOverlay(polygon);
    };

    formatPoint = list => {
        const trackPoint = [];
        list.forEach(item => {
            trackPoint.push(new window.BMap.Point(item.lon, item.lat));
        });
        return trackPoint;
    };

    render() {
        const {
            orderInfo: {
                mode,
                order_sn,
                bike_sn,
                user_name,
                mobile,
                start_location,
                end_location,
                distance,
            },
        } = this.state || {};
        return (
            <div>
                <Card>
                    <div id="orderDetailMap" style={{ height: 560 }} />
                    <div className="detail-items">
                        <div className="item-title">基础信息</div>
                        <div className="detail-form">
                            <li>
                                <div className="detail-form-left">用车模式</div>
                                <div className="detail-form-content">
                                    {mode === 1 ? '服务区' : '停车点'}
                                </div>
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
                                <div className="detail-form-content">
                                    {distance / 1000}
                                    公里
                                </div>
                            </li>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
}

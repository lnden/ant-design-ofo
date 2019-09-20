import React, { Component } from 'react';
import { Card } from 'antd';
import BaseForm from '../../components/BaseForm';
import formList from './map';
import axios from '../../utils/request';

export default class Map extends Component {
    map = {};

    params = {
        page: 1,
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.requestList();
    }

    handleFilter = params => {
        this.params = params;
        this.requestList();
    };

    // 渲染地图数据
    renderMap = res => {
        const list = res.route_list;
        this.map = new window.BMap.Map('container');
        const gps1 = list[0].split(',');
        const startPoint = new window.BMap.Point(gps1[0], gps1[1]);
        const gps2 = list[list.length - 1].split(',');
        const endPoint = new window.BMap.Point(gps2[0], gps2[1]);

        // 设置地图的中心点
        this.map.centerAndZoom(endPoint, 11);

        // 车辆的起点
        const startPointIcon = new window.BMap.Icon(
            '/assets/start_point.png',
            new window.BMap.Size(36, 42),
            {
                imageSize: new window.BMap.Size(36, 42),
                anchor: new window.BMap.Size(18, 42),
            },
        );
        const bikeMarkerStart = new window.BMap.Marker(startPoint, { icon: startPointIcon });
        this.map.addOverlay(bikeMarkerStart);

        const endPointIcon = new window.BMap.Icon(
            '/assets/end_point.png',
            new window.BMap.Size(36, 42),
            {
                imageSize: new window.BMap.Size(36, 42),
                anchor: new window.BMap.Size(18, 42),
            },
        );
        const bikeMarkerEnd = new window.BMap.Marker(endPoint, { icon: endPointIcon });
        this.map.addOverlay(bikeMarkerEnd);

        // 绘制车辆行驶路线
        const routeList = [];
        list.forEach(item => {
            const p = item.split(',');
            routeList.push(new window.BMap.Point(p[0], p[1]));
        });

        const polyLine = new window.BMap.Polyline(routeList, {
            strokeColor: '#ef4136',
            strokeWeight: 2,
            strokeOpacity: 1,
        });
        this.map.addOverlay(polyLine);

        // 绘制服务区
        const servicePointList = [];
        const serviceList = res.service_list;
        serviceList.forEach(item => {
            servicePointList.push(new window.BMap.Point(item.lon, item.lat));
        });
        const serviceLine = new window.BMap.Polyline(servicePointList, {
            strokeColor: '#090',
            strokeWeight: 2,
            strokeOpacity: 1,
        });
        this.map.addOverlay(serviceLine);

        // 添加地中的自行车图标
        const bikeList = res.bike_list;
        const bikeIcon = new window.BMap.Icon('/assets/bike.jpg', new window.BMap.Size(36, 42), {
            imageSize: new window.BMap.Size(36, 42),
            anchor: new window.BMap.Size(18, 42),
        });
        bikeList.forEach(item => {
            const p = item.split(',');
            const point = new window.BMap.Point(p[0], p[1]);
            const bikeMarker = new window.BMap.Marker(point, { icon: bikeIcon });
            this.map.addOverlay(bikeMarker);
        });
    };

    requestList = () => {
        axios
            .ajax({
                url: 'map/bike_list',
                data: {
                    params: this.params,
                },
                isMock: false,
            })
            .then(res => {
                if (res.code === 0) {
                    // this.setState({
                    //     total_count: res.result.total_count,
                    // });
                    this.renderMap(res.result);
                }
            });
    };

    render() {
        return (
            <div>
                <Card>
                    <BaseForm
                        layout="inline"
                        formList={formList}
                        filterSubmit={this.handleFilter}
                    />
                </Card>
                <Card title="渲染地图">
                    <div>共100辆车</div>
                    <div id="container" style={{ height: 500 }} />
                </Card>
            </div>
        );
    }
}

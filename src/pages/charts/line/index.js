import React, { Component } from 'react';
import { Card } from 'antd';

import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';
import themeLight from '../themeLight';

export default class Line extends Component {
    componentWillMount() {
        echarts.registerTheme('Imooc', themeLight);
    }

    getOption = () => {
        const option = {
            title: {
                text: '用户骑行订单',
            },
            tooltip: {
                trigger: 'axis',
            },
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    name: '摩拜订单量',
                    type: 'line',
                    data: [1000, 2000, 1500, 3000, 2000, 1200, 800],
                },
            ],
        };
        return option;
    };

    getOption1 = () => {
        const option = {
            title: {
                text: '用户骑行订单',
            },
            tooltip: {
                trigger: 'axis',
            },
            legend: {
                data: ['摩拜订单量', 'OFO订单量'],
            },
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    name: '摩拜订单量',
                    type: 'line',
                    data: [1000, 2000, 4500, 6000, 8000, 10000, 12000],
                },
                {
                    name: 'OFO订单量',
                    type: 'line',
                    data: [1200, 3000, 4500, 6000, 7000, 12000, 20000],
                },
            ],
        };
        return option;
    };

    getOption2 = () => {
        const option = {
            title: {
                text: '用户骑行订单',
            },
            tooltip: {
                trigger: 'axis',
            },
            xAxis: {
                boundaryGap: false, // 两边是否留白
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    name: '摩拜订单量',
                    type: 'line',
                    data: [1000, 2000, 1500, 3000, 2000, 1200, 800],
                    areaStyle: {},
                },
            ],
        };
        return option;
    };

    render() {
        return (
            <div>
                <Card title="折线图一">
                    <ReactEcharts option={this.getOption()} style={{ height: 500 }} />
                </Card>
                <Card title="折线图二">
                    <ReactEcharts
                        option={this.getOption1()}
                        theme="Imooc"
                        style={{ height: 500 }}
                    />
                </Card>
                <Card title="折线图三">
                    <ReactEcharts option={this.getOption2()} style={{ height: 500 }} />
                </Card>
            </div>
        );
    }
}

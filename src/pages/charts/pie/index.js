import React, { Component } from 'react';
import { Card } from 'antd';

// 导入核心库
import echarts from 'echarts/lib/echarts';
// 导入饼图
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import ReactEcharts from 'echarts-for-react';
import themeLight from '../themeLight';

export default class Pie extends Component {
    componentWillMount() {
        echarts.registerTheme('Imooc', themeLight);
    }

    getOption = () => {
        const option = {
            title: {
                x: 'center',
                text: '用户骑行订单',
            },
            legend: {
                orient: 'vertical',
                right: 10,
                top: 20,
                buttom: 20,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a}<br/>{b}:  {c}({d}%)',
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    data: [
                        { value: 1000, name: '周一' },
                        { value: 1000, name: '周二' },
                        { value: 2000, name: '周三' },
                        { value: 1500, name: '周四' },
                        { value: 3000, name: '周五' },
                        { value: 2000, name: '周六' },
                        { value: 1200, name: '周日' },
                    ],
                },
            ],
        };
        return option;
    };

    getOption2 = () => {
        const option = {
            title: {
                x: 'center', // 3.修改标题的位置
                text: '用户骑行订单',
            },
            legend: {
                orient: 'vertical', // 4.修改图标的位置
                right: 10,
                top: 20,
                buttom: 20,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a}<br/>{b}:  {c}({d}%)',
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    radius: ['40%', '60%'], // 1.内圆和外圆的占比
                    center: ['30%', '60%'], // 2.修改饼图的位置
                    data: [
                        { value: 1000, name: '周一' },
                        { value: 1000, name: '周二' },
                        { value: 2000, name: '周三' },
                        { value: 1500, name: '周四' },
                        { value: 3000, name: '周五' },
                        { value: 2000, name: '周六' },
                        { value: 1200, name: '周日' },
                    ],
                },
            ],
        };
        return option;
    };

    getOption3 = () => {
        const option = {
            title: {
                x: 'center', // 3.修改标题的位置
                text: '用户骑行订单',
            },
            legend: {
                orient: 'vertical', // 4.修改图标的位置
                right: 10,
                top: 20,
                buttom: 20,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a}<br/>{b}:  {c}({d}%)',
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    data: [
                        { value: 1000, name: '周一' },
                        { value: 1000, name: '周二' },
                        { value: 2000, name: '周三' },
                        { value: 1500, name: '周四' },
                        { value: 3000, name: '周五' },
                        { value: 2000, name: '周六' },
                        { value: 1200, name: '周日' },
                    ].sort((a, b) => {
                        return a.value - b.value;
                    }),
                    roseType: 'radius',
                },
            ],
        };
        return option;
    };

    render() {
        return (
            <div>
                <Card title="饼图一">
                    <ReactEcharts option={this.getOption()} theme="Imooc" style={{ height: 500 }} />
                </Card>
                <Card title="饼图二">
                    <ReactEcharts
                        option={this.getOption2()}
                        theme="Imooc"
                        style={{ height: 500 }}
                    />
                </Card>
                <Card title="饼图三">
                    <ReactEcharts option={this.getOption3()} style={{ height: 500 }} />
                </Card>
            </div>
        );
    }
}

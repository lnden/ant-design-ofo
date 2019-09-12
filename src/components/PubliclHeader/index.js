import React, {Component} from 'react'
import {Row, Col} from 'antd'
import './index.less'
import Util from '../../utils/utils';
import axios from '../../utils/request'

export default class PublicHeader extends Component {
    state = {
        clear: null,
        sysTime: Util.formateDate(new Date().getTime()),
        dayPictureUrl: '',
        weather: ''
    };

    componentWillMount() {
        this.clear = setInterval(() => {
            let sysTime = Util.formateDate(new Date().getTime())
            this.setState({sysTime})
        }, 1000);
        this.getWeatherApiData();
    }

    componentWillUnmount() {
        clearInterval(this.clear)
    }

    getWeatherApiData = () => {
        let city = '北京';
        const baseApi = `http://api.map.baidu.com/telematics/v3/weather?location=${encodeURIComponent(city)}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
        axios.jsonp({url: baseApi}).then(res => {
            let data = res.results[0].weather_data[0];
            this.setState({
                dayPictureUrl: data.dayPictureUrl,
                weather: data.temperature
            })
        })
    };

    render() {
        return (
            <header className="header">
                <Row className="header-top">
                    <Col span={24}>
                        <span>Hello world</span>
                        <a href="/login">退出</a>
                    </Col>
                </Row>
                <Row className="breadcrumb">
                    <Col span={4} className="breadcrumb-title">
                        首页
                    </Col>
                    <Col span={20} className="weather">
                        <span className="date">{this.state.sysTime}</span>
                        <span className="weather-img">
                            <img src={this.state.dayPictureUrl} alt=""/>
                        </span>
                        <span className="weather-detail">
                            {this.state.weather}
                        </span>
                    </Col>
                </Row>
            </header>
        )
    }
}
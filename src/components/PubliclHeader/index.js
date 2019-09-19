import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import './index.less';
import Util from '../../utils/utils';
import axios from '../../utils/request';

class PublicHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clear: null,
            sysTime: Util.formateDate(new Date().getTime()),
            dayPictureUrl: '',
            weather: '',
        };
    }

    componentWillMount() {
        const clear = setInterval(() => {
            const sysTime = Util.formateDate(new Date().getTime());
            this.setState({ sysTime });
        }, 1000);
        this.setState(() => clear);
        this.getWeatherApiData();
    }

    componentWillUnmount() {
        const { clear } = this.state;
        clearInterval(clear);
    }

    getWeatherApiData = () => {
        const city = '北京';
        const baseApi = `http://api.map.baidu.com/telematics/v3/weather?location=${encodeURIComponent(
            city,
        )}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
        axios.jsonp({ url: baseApi }).then(res => {
            const data = res.results[0].weather_data[0];
            this.setState({
                dayPictureUrl: data.dayPictureUrl,
                weather: data.temperature,
            });
        });
    };

    render() {
        const { menuName } = this.props;
        const { sysTime, dayPictureUrl, weather } = this.state;
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
                        {menuName || '首页'}
                    </Col>
                    <Col span={20} className="weather">
                        <span className="date">{sysTime}</span>
                        <span className="weather-img">
                            <img src={dayPictureUrl} alt="" />
                        </span>
                        <span className="weather-detail">{weather}</span>
                    </Col>
                </Row>
            </header>
        );
    }
}

const mapStateToProps = state => {
    return {
        menuName: state.menuName,
    };
};
export default connect(mapStateToProps)(PublicHeader);

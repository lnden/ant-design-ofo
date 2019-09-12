import React, {Component} from 'react'
import {Row, Col} from 'antd'
import PublicHeader from './components/PubliclHeader'
import PublicFooter from './components/PublicFooter'
import MenuList from './components/MenuList'
import './styles/common.less'

export default class Admin extends Component {
    render() {
        return (
            <Row className="container">
                <Col span={4} className="menu-left">
                    <MenuList/>
                </Col>
                <Col span={20} className="main">
                    <PublicHeader/>
                    <Row className="content">
                        {this.props.children}
                    </Row>
                    <PublicFooter/>
                </Col>
            </Row>
        )
    }
}
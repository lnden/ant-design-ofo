import React, { Component } from 'react'
import { Row, Button } from 'antd'
import { Link } from 'react-router-dom'
import PublicHeader from '../components/PubliclHeader'

export default class PublicLayout extends Component {
    render() {
        return (
            <div>
                <Row className="simple-page">
                    <PublicHeader menuType="second" />
                </Row>
                <Row className="content">
                    <Button type="primary"><Link to="/home">返回</Link></Button>
                    {this.props.children}
                </Row>
            </div>
        )
    }
}
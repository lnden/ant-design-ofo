import React, {Component} from 'react'
import {Row} from 'antd'
import PublicHeader from '../components/PubliclHeader'

export default class PublicLayout extends Component {
    render() {
        return (
            <div>
                <Row classNmae="simple-page">
                    <PublicHeader menuType="second"/>
                </Row>
                <Row className="content">
                    {this.props.children}
                </Row>
            </div>
        )
    }
}
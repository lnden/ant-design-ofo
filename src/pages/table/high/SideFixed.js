import React, { Component } from 'react'
import { Card, Table } from 'antd'

export default class SideFiexd extends Component {
    render(){
        return (
            <div>
                <Card title="两侧固定">
                    <Table />
                </Card>
            </div>
        )
    }
}
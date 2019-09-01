import React, { Component } from 'react'
import { Card, Table } from 'antd'

export default class OpeartionTable extends Component {
    render(){
        return (
            <div>
                <Card title="操作表格">
                    <Table />
                </Card>
            </div>
        )
    }
}
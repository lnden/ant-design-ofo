import React, { Component } from 'react'
import { Card, Table } from 'antd'

export default class SortTable extends Component {
    render(){
        return (
            <div>
                <Card title="表格排序">
                    <Table />
                </Card>
            </div>
        )
    }
}
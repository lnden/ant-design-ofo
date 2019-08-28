import React, {Component} from 'react'
import {Table} from 'antd'
import columns from './columns'

export default class RenderTable extends Component {

    render() {
        return (
            <Table
                bordered
                columns={columns}
                dataSource={this.props.dataSource}
                pagination={false}
            />
        )
    }
}
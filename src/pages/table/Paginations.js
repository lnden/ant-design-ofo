import React, {Component} from 'react'
import {Table} from 'antd'
import columns from './columns'
import Utils from '../../utils/utils'

export default class Paginations extends Component {
    render() {
        return (
            <Table
                bordered
                columns={columns}
                dataSource={this.props.dataSource}
                pagination={Utils.pagination()}
            />
        )
    }
}
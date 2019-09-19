import React, { Component } from 'react';
import { Table } from 'antd';
import columns from './columns';

export default class RenderTable extends Component {
    render() {
        const { dataSource } = this.props;
        return <Table bordered columns={columns} dataSource={dataSource} pagination={false} />;
    }
}

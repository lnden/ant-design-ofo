import React, { Component } from 'react';
import { Table } from 'antd';
import columns from './columns';

export default class Paginations extends Component {
    render() {
        const { dataSource, pagination } = this.props;
        return <Table bordered columns={columns} dataSource={dataSource} pagination={pagination} />;
    }
}

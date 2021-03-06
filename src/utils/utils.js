import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

export default {
    formateDate(time) {
        if (!time) return '';
        const date = new Date(time);
        return `${date.getFullYear()}-${date.getMonth() +
            1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    },
    pagination(data = {}, callback) {
        return {
            current: data.result.page,
            pageSize: data.result.page_size,
            total: data.result.total,
            showTotal: () => {
                return `共${data.result.total}条`;
            },
            showQuickJumper: true,
            onChange: current => {
                callback(current);
            },
        };
    },
    getOptionList(data) {
        if (!data) {
            return [];
        }
        const options = [];
        data.forEach(item => {
            options.push([
                <Option value={item.id} key={item.id + Math.random()}>
                    {item.name}
                </Option>,
            ]);
        });
        return options;
    },
    updateSelectedItem(selectedRowKeys, selectedRows, selectedIds) {
        if (selectedIds) {
            this.setState({
                selectedRowKeys,
                selectedIds,
                selectedItem: selectedRows,
            });
        } else {
            this.setState({
                selectedRowKeys,
                selectedItem: selectedRows,
            });
        }
    },
    formateDataList(data = {}) {
        const dataList = [...data];
        let newDate = [];
        for (let i = 0, { length } = dataList; i < length; i += 1) {
            dataList[i].key = i;
            newDate = [...newDate, dataList[i]];
        }
        return newDate;
    },
};

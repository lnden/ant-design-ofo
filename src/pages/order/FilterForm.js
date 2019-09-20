import React, { Component } from 'react';
import { Form, Select, Button, DatePicker } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;

class FilterForm extends Component {
    handleSearchBtn = () => {
        const {
            form: { getFieldsValue },
            handleSearch,
        } = this.props;
        const values = getFieldsValue();
        handleSearch(values);
    };

    render() {
        const {
            form: { getFieldDecorator },
        } = this.props;
        return (
            <Form layout="inline">
                <FormItem label="城市">
                    {getFieldDecorator('city_id')(
                        <Select style={{ width: 100 }} placeholder="全部">
                            <Option value="">全部</Option>
                            <Option value="1">北京市</Option>
                            <Option value="2">天津市</Option>
                            <Option value="3">深圳市</Option>
                        </Select>,
                    )}
                </FormItem>
                <FormItem label="订单时间">
                    {getFieldDecorator('start_time')(
                        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />,
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('end_time')(
                        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />,
                    )}
                </FormItem>
                <FormItem label="订单状态">
                    {getFieldDecorator('op_mode')(
                        <Select style={{ width: 80 }} placeholder="全部">
                            <Option value="">全部</Option>
                            <Option value="1">进行中</Option>
                            <Option value="2">行程结束</Option>
                        </Select>,
                    )}
                </FormItem>
                <FormItem label="加盟商授权状态">
                    {getFieldDecorator('auth_status')(
                        <Select style={{ width: 100 }} placeholder="全部">
                            <Option value="">全部</Option>
                            <Option value="1">已授权</Option>
                            <Option value="2">未授权</Option>
                        </Select>,
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" onClick={this.handleSearchBtn}>
                        查询
                    </Button>
                    <Button>重置</Button>
                </FormItem>
            </Form>
        );
    }
}

const FilterFormCopy = Form.create({})(FilterForm);
export default FilterFormCopy;

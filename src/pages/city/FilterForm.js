import React, {Component} from 'react'
import {Form, Select, Button} from 'antd'

const FormItem = Form.Item;
const Option = Select.Option;

class FilterForm extends Component {

    handleSearchBtn = () => {
        const values = this.props.form.getFieldsValue();
        this.props.handleSearch(values)
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Form layout="inline">
                <FormItem label="城市">
                    {
                        getFieldDecorator('city_id')(
                            <Select style={{width: 100}} placeholder="全部">
                                <Option value="">全部</Option>
                                <Option value="1">北京市</Option>
                                <Option value="2">天津市</Option>
                                <Option value="3">深圳市</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="用车模式">
                    {
                        getFieldDecorator('mode')(
                            <Select style={{width: 120}} placeholder="全部">
                                <Option value="">全部</Option>
                                <Option value="1">停车点模式</Option>
                                <Option value="2">禁停区模式</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="营运模式">
                    {
                        getFieldDecorator('op_mode')(
                            <Select style={{width: 80}} placeholder="全部">
                                <Option value="">全部</Option>
                                <Option value="1">自营</Option>
                                <Option value="2">加盟</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="加盟商授权状态">
                    {
                        getFieldDecorator('auth_status')(
                            <Select style={{width: 100}} placeholder="全部">
                                <Option value="">全部</Option>
                                <Option value="1">已授权</Option>
                                <Option value="2">未授权</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem>
                    <Button type="primary" onClick={this.handleSearchBtn}>查询</Button>
                    <Button>重置</Button>
                </FormItem>
            </Form>
        );
    }
}

export default FilterForm = Form.create({})(FilterForm);
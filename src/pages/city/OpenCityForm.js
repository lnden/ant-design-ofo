import React, {Component} from 'react'
import {Form, Select} from 'antd'

const FormItem = Form.Item;
const Option = Select.Option;

class OpenCityForm extends Component {
    render() {
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 19}
        };
        const {getFieldDecorator} = this.props.form;
        return (
            <Form layout="horizontal">
                <FormItem label="选择城市" {...formItemLayout}>
                    {
                        getFieldDecorator('city_id', {
                            initialValue: '2'
                        })(
                            <Select style={{width: 200}} placeholder="全部">
                                <Option value="">全部</Option>
                                <Option value="1">北京</Option>
                                <Option value="2">天津</Option>
                                <Option value="3">深圳市</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="运营模式" {...formItemLayout}>
                    {
                        getFieldDecorator('op_mode', {
                            initialValue: '2'
                        })(
                            <Select style={{width: 200}} placeholder="全部">
                                <Option value="">全部</Option>
                                <Option value="1">自营</Option>
                                <Option value="2">加盟</Option>
                            </Select>
                        )
                    }

                </FormItem>
                <FormItem label="用车模式" {...formItemLayout}>
                    {
                        getFieldDecorator('use_mode', {
                            initialValue: '1'
                        })(
                            <Select style={{width: 200}} placeholder="全部">
                                <Option value="">全部</Option>
                                <Option value="1">停车点模式</Option>
                                <Option value="2">禁停区模式</Option>
                            </Select>
                        )
                    }
                </FormItem>
            </Form>
        )
    }
}

export default OpenCityForm = Form.create({})(OpenCityForm)
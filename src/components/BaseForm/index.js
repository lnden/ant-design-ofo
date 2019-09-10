import React, { Component } from 'react'
import { Form, Input, Select, Button, Checkbox, DatePicker } from 'antd'
import Utils from '../../../src/utils/utils'

const FormItem = Form.Item;

class BaseForm extends Component {

    handleFilterSubmit = () => {
        let fieldsVlaue = this.props.form.getFieldsValue()
        this.props.filterSubmit(fieldsVlaue)
    }

    handleReset = () => {
        this.props.form.resetFields();
    }

    initFormList = () => {
        const { getFieldDecorator } = this.props.form;
        const formList = this.props.formList;
        const formItemList = []
        if (formList && formList.length > 0) {
            formList.forEach(item => {
                const { label, field, initialValue = "", placeholder, width } = item;
                switch (item.type) {
                    case "DATEPICKER":
                        const begin_time = <FormItem label="订单时间" key="begin_time">
                            {
                                getFieldDecorator(['begin_time'])(
                                    <DatePicker
                                        showTime
                                        format="YYYY-MM-DD HH:mm:ss"
                                        placeholder="选择开始时间"
                                    />
                                )
                            }
                        </FormItem>
                        formItemList.push(begin_time)

                        const end_time = <FormItem label="~" colon={false} key="end_time">
                            {
                                getFieldDecorator(['end_time'])(
                                    <DatePicker
                                        showTime
                                        format="YYYY-MM-DD HH:mm:ss"
                                        placeholder="选择结束时间"
                                    />
                                )
                            }
                        </FormItem>
                        formItemList.push(end_time);

                        break;
                    case "SELECT":
                        const SELECT = <FormItem label={label} key={field}>
                            {
                                getFieldDecorator(field, {
                                    initialValue: initialValue//隐藏此字段下面的placeholder才会展示
                                })(
                                    <Select
                                        style={{ width: width }}
                                        placeholder={placeholder}
                                    >
                                        {Utils.getOptionList(item.list)}
                                    </Select>
                                )
                            }
                        </FormItem>
                        formItemList.push(SELECT);
                        break;
                    case "CHECKBOX":
                        const CHECKBOX = <FormItem label={label} key={field}>
                            {
                                getFieldDecorator([field], {
                                    valuePropName: 'checked',
                                    initialValue: initialValue
                                })(
                                    <Checkbox style={{ width: width }}>
                                        {label}
                                    </Checkbox>
                                )
                            }
                        </FormItem>
                        formItemList.push(CHECKBOX);
                        break;
                    case "DATE":
                        const DATEPICKER = <FormItem label={label} key={field}>
                            {
                                getFieldDecorator([field])(
                                    <DatePicker
                                        showTime
                                        format="YYYY-MM-DD HH:mm:ss"
                                        placeholder={placeholder}
                                    />
                                )
                            }
                        </FormItem>
                        formItemList.push(DATEPICKER);
                        break;
                    default:
                    case "INPUT":
                        const INPUT = <FormItem label={label} key={field}>
                            {
                                getFieldDecorator(field, {
                                    initialValue: initialValue
                                })(
                                    <Input
                                        type="text"
                                        placeholder={placeholder}
                                        style={{ width: width }}
                                    />
                                )
                            }
                        </FormItem>
                        formItemList.push(INPUT);
                        break;
                }
            })
        }
        return formItemList;
    }

    render() {
        return (
            <Form layout={this.props.layout || 'horizontal'}>
                {this.initFormList()}
                <FormItem>
                    <Button type="primary" onClick={this.handleFilterSubmit}>查询</Button>
                    <Button type="primary" onClick={this.handleReset}>重置</Button>
                </FormItem>
            </Form>
        )
    }
}

export default Form.create({})(BaseForm)
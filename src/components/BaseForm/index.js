import React, { Component } from 'react'
import { Form, Input, Select, Button, Checkbox, DatePicker } from 'antd'
import Utils from '../../../src/utils/utils'

const FormItem = Form.Item;

class BaseForm extends Component {

    handleFilterSubmit = () => {
        let fieldsVlaue = this.props.form.getFieldsValue()
        this.props.filterSubmit(fieldsVlaue)
    }

    initFormList = () => {
        const { getFieldDecorator } = this.props.form;
        const formList = this.props.formList;
        const formItemList = []
        if (formList && formList.length > 0) {
            formList.forEach((item, i) => {
                let label = item.label;
                let field = item.field;
                let initialValue = item.initialValue || "";
                let placeholder = item.placeholder;
                let width = item.width;
                if (item.type === "时间查询") {
                    const begin_time = <FormItem label="订单时间" key={field}>
                        {
                            getFieldDecorator(['begin_time'])(
                                <DatePicker
                                    showTime
                                    format="YYYY-MM-DD HH:mm:ss"
                                    placeholder={placeholder}
                                />
                            )
                        }
                    </FormItem>
                    formItemList.push(begin_time)

                    const end_time = <FormItem label="~" colon={false} key={field}>
                    {
                        getFieldDecorator(['end_time'])(
                            <DatePicker
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"
                                placeholder={placeholder}
                            />
                        )
                    }
                    </FormItem>
                     formItemList.push(end_time)
                }
                if (item.type === 'INPUT') {
                    const INPUT = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field], {
                                initialValue: initialValue
                            })(
                                <Input
                                    type="text"
                                    placeholder={placeholder}
                                />
                            )
                        }
                    </FormItem>
                    formItemList.push(INPUT)
                } else if (item.type === 'SELECT') {
                    const SELECT = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator([field], {
                                initialValue: initialValue
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
                    formItemList.push(SELECT)
                } else if (item.type === 'CHECKBOX') {
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
                    formItemList.push(CHECKBOX)
                }
            })
        }
        return formItemList;
    }

    render() {
        return (
            <Form layout="inline">
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
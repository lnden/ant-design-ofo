import React, { Component } from 'react';
import { Form, Input, Select, Button, Checkbox, DatePicker } from 'antd';
import Utils from '../../utils/utils';

const FormItem = Form.Item;

class BaseForm extends Component {
    handleFilterSubmit = () => {
        const { form, filterSubmit } = this.props;
        const fieldsVlaue = form.getFieldsValue();
        filterSubmit(fieldsVlaue);
    };

    handleReset = () => {
        const { form } = this.props;
        form.resetFields();
    };

    initFormList = () => {
        const {
            formList,
            form: { getFieldDecorator },
        } = this.props;
        const formItemList = [];
        if (formList && formList.length > 0) {
            formList.forEach(item => {
                const { label, field, initialValue = '', placeholder, width } = item;
                let begin_time = null;
                let end_time = null;
                let SELECT = null;
                let CHECKBOX = null;
                let DATEPICKER = null;
                let INPUT = null;
                switch (item.type) {
                    case 'DATEPICKER':
                        begin_time = (
                            <FormItem label="订单时间" key="begin_time">
                                {getFieldDecorator(['begin_time'])(
                                    <DatePicker
                                        showTime
                                        format="YYYY-MM-DD HH:mm:ss"
                                        placeholder="选择开始时间"
                                    />,
                                )}
                            </FormItem>
                        );
                        formItemList.push(begin_time);

                        end_time = (
                            <FormItem label="~" colon={false} key="end_time">
                                {getFieldDecorator(['end_time'])(
                                    <DatePicker
                                        showTime
                                        format="YYYY-MM-DD HH:mm:ss"
                                        placeholder="选择结束时间"
                                    />,
                                )}
                            </FormItem>
                        );
                        formItemList.push(end_time);

                        break;
                    case 'SELECT':
                        SELECT = (
                            <FormItem label={label} key={field}>
                                {getFieldDecorator(field, {
                                    initialValue, // 隐藏此字段下面的placeholder才会展示
                                })(
                                    <Select style={{ width }} placeholder={placeholder}>
                                        {Utils.getOptionList(item.list)}
                                    </Select>,
                                )}
                            </FormItem>
                        );
                        formItemList.push(SELECT);
                        break;
                    case 'CHECKBOX':
                        CHECKBOX = (
                            <FormItem label={label} key={field}>
                                {getFieldDecorator([field], {
                                    valuePropName: 'checked',
                                    initialValue,
                                })(<Checkbox style={{ width }}>{label}</Checkbox>)}
                            </FormItem>
                        );
                        formItemList.push(CHECKBOX);
                        break;
                    case 'DATE':
                        DATEPICKER = (
                            <FormItem label={label} key={field}>
                                {getFieldDecorator([field])(
                                    <DatePicker
                                        showTime
                                        format="YYYY-MM-DD HH:mm:ss"
                                        placeholder={placeholder}
                                    />,
                                )}
                            </FormItem>
                        );
                        formItemList.push(DATEPICKER);
                        break;
                    default:
                    case 'INPUT':
                        INPUT = (
                            <FormItem label={label} key={field}>
                                {getFieldDecorator(field, {
                                    initialValue,
                                })(
                                    <Input
                                        type="text"
                                        placeholder={placeholder}
                                        style={{ width }}
                                    />,
                                )}
                            </FormItem>
                        );
                        formItemList.push(INPUT);
                        break;
                }
            });
        }
        return formItemList;
    };

    render() {
        const { layout } = this.props;
        return (
            <Form layout={layout || 'horizontal'}>
                {this.initFormList()}
                <FormItem>
                    <Button type="primary" onClick={this.handleFilterSubmit}>
                        查询
                    </Button>
                    <Button type="primary" onClick={this.handleReset}>
                        重置
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

export default Form.create({})(BaseForm);

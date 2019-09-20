import React, { Component } from 'react';
import { Form, Input, Radio, Select, DatePicker } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const { Option } = Select;

/* eslint-disable */
class UserForm extends Component {
    getState = state => {
        return {
            '1': '咸鱼一条',
            '2': '风华浪子',
            '3': '北大才子',
        }[state];
    };

    render() {
        const {
            type,
            form: { getFieldDecorator },
            userInfo = {},
        } = this.props;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 },
        };
        return (
            <Form layout="horizontal">
                <FormItem label="用户名" {...formItemLayout}>
                    {type === 'detail'
                        ? userInfo && userInfo.username
                        : getFieldDecorator('user_name', {
                              initialValue: userInfo && userInfo.username,
                          })(<Input type="text" placeholder="请输入用户名" />)}
                </FormItem>

                <FormItem label="性别" {...formItemLayout}>
                    {type === 'detail'
                        ? userInfo && userInfo.sex === 1
                            ? '男'
                            : '女'
                        : getFieldDecorator('sex', {
                              initialValue: userInfo && userInfo.sex,
                          })(
                              <RadioGroup>
                                  <Radio value={1}>男</Radio>
                                  <Radio value={2}>女</Radio>
                              </RadioGroup>,
                          )}
                </FormItem>

                <FormItem label="状态" {...formItemLayout}>
                    {type === 'detail'
                        ? userInfo && this.getState(userInfo.state)
                        : getFieldDecorator('state', {
                              initialValue: userInfo && userInfo.state,
                          })(
                              <Select>
                                  <Option value={1}>咸鱼一条</Option>
                                  <Option value={2}>风华浪子</Option>
                                  <Option value={3}>北大才子</Option>
                              </Select>,
                          )}
                </FormItem>

                <FormItem label="生日" {...formItemLayout}>
                    {type === 'detail'
                        ? userInfo && userInfo.birthday
                        : getFieldDecorator('birthday', {
                              initialValue: userInfo && moment(userInfo.birthday),
                          })(<DatePicker />)}
                </FormItem>

                <FormItem label="联系地址" {...formItemLayout}>
                    {type === 'detail'
                        ? userInfo && userInfo.address
                        : getFieldDecorator('address', {
                              initialValue: userInfo && userInfo.address,
                          })(<TextArea rows={2} placeholder="请输入联系地址" />)}
                </FormItem>
            </Form>
        );
    }
}

const UserFormCopy = Form.create({})(UserForm);

export default UserFormCopy;

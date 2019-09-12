import React, { Component } from 'react'
import { Card, Form, Input, Button, message, Icon, Checkbox } from 'antd'

const FormItem = Form.Item;

class Login extends Component {

    handleSubmit = () => {
        const userInfo = this.props.form.getFieldsValue();
        this.props.form.validateFields((err, value) => {
            if (!err) {
                message.success(`${userInfo.username} 恭喜您，您已通过本次表单组件学习，当前密码为 ${userInfo.password}`)
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <div>
                <Card title="登录行内表单">
                    <Form layout="inline">
                        <FormItem>
                            <Input placeholder="请输入用户名" />
                        </FormItem>
                        <FormItem>
                            <Input type="password" placeholder="请输入密码" />
                        </FormItem>
                        <FormItem>
                            <Button type="primary">登录</Button>
                        </FormItem>
                        <FormItem>
                            <Button type="primary">重置</Button>
                        </FormItem>
                    </Form>
                </Card>
                <Card title="登录水平表单">
                    <Form layout="horizontal" style={{ width: 300 }}>
                        <FormItem>
                            {
                                getFieldDecorator('username', {
                                    initialValue: '',
                                    rules: [
                                        { required: true, message: 'please input your username!' },
                                        { min: 5, max: 10, message: '长度不在范围内' },
                                        { pattern: /^\w+$/g, message: '用户必须为字母或数字' }//new RegExp('^\\w+$','g'),\需要转义
                                    ]
                                })(<Input prefix={<Icon type="user" />} placeholder="请输入用户名" />)
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('password', {
                                    initialValue: '',
                                    rules: [
                                        { required: true, message: 'please input your password!' }]
                                })(<Input prefix={<Icon type="lock" />} type="password" placeholder="请输入密码" />)
                            }
                        </FormItem>
                        <FormItem>
                            {
                                getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(
                                    <Checkbox>记住密码</Checkbox>//checkbox添加默认值比较特殊，需要如上两个属性
                                )
                            }
                            <a href="http://www.baidu.com" style={{ float: 'right' }}>忘记密码</a>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" onClick={this.handleSubmit}>登录</Button>
                            <Button type="primary">重置</Button>
                        </FormItem>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default Form.create({})(Login)
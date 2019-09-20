import React, { Component } from 'react';
import { Form, Input, Select } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;

class RoleForm extends Component {
    render() {
        const {
            form: { getFieldDecorator },
        } = this.props;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 15 },
        };
        return (
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    {getFieldDecorator('role_name')(
                        <Input type="text" placeholder="请输入角色名称" />,
                    )}
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {getFieldDecorator('state')(
                        <Select>
                            <Option value={1}>启用</Option>
                            <Option value={0}>停用</Option>
                        </Select>,
                    )}
                </FormItem>
            </Form>
        );
    }
}

const RoleFormCopy = Form.create({})(RoleForm);

export default RoleFormCopy;

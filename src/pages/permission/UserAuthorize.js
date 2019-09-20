import React, { Component } from 'react';
import { Form, Input, Transfer } from 'antd';

const FormItem = Form.Item;

class RoleAuthForm extends Component {
    filterOption = (inputValue, option) => {
        return option.title.indexOf(inputValue) > -1;
    };

    handleChange = targetKeys => {
        const { patchMenuInfo } = this.props;
        patchMenuInfo(targetKeys);
    };

    render() {
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 15 },
        };
        const { detailInfo, mockData, targetKeys } = this.props;
        return (
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    <Input disabled placeholder={detailInfo.role_name} />
                </FormItem>
                <FormItem label="选择用户" {...formItemLayout}>
                    <Transfer
                        listStyle={{ width: 200, height: 600 }}
                        dataSource={mockData}
                        title={['待选用户', '已选用户']}
                        showSearch
                        locale={{ searchPlaceholder: '输入用户名' }}
                        filterOption={this.filterOption}
                        targetKeys={targetKeys}
                        onChange={this.handleChange}
                        render={item => item.title}
                    />
                </FormItem>
            </Form>
        );
    }
}

const RoleAuthFormCopy = Form.create({})(RoleAuthForm);

export default RoleAuthFormCopy;

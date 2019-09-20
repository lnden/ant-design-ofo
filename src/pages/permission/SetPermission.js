import React, { Component } from 'react';

import { Form, Input, Select, Tree } from 'antd';
import menuConfig from '../../config/menuConfig';

const { Option } = Select;
const { TreeNode } = Tree;
const FormItem = Form.Item;

class PermissionForm extends Component {
    // 递归渲染权限树
    renderTreeNodes = data => {
        return data.map(item => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            } else {
                return <TreeNode title={item.title} key={item.key} />;
            }
        });
    };

    // 该方法可能会产生疑惑，由于react是单向数据流，如果要修改该组件的状态，需要修改父组件的数据，再次传递该组件
    onCheck = checkedKeys => {
        const { patchMenuInfo } = this.props;
        patchMenuInfo(checkedKeys);
    };

    render() {
        const {
            form: { getFieldDecorator },
            detailInfo,
            menuInfo,
        } = this.props;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 15 },
        };

        return (
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    <Input disabled placeholder={detailInfo.role_name} />
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {getFieldDecorator('status', {
                        initialValue: '1',
                    })(
                        <Select>
                            <Option value="1">启用</Option>
                            <Option value="0">停用</Option>
                        </Select>,
                    )}
                </FormItem>
                <Tree
                    checkable
                    defaultExpandAll
                    onCheck={checkedKeys => {
                        this.onCheck(checkedKeys);
                    }}
                    checkedKeys={menuInfo}
                >
                    <TreeNode title="平台权限" key="platform_all">
                        {this.renderTreeNodes(menuConfig)}
                    </TreeNode>
                </Tree>
            </Form>
        );
    }
}

const PermissionFormCopy = Form.create({})(PermissionForm);

export default PermissionFormCopy;

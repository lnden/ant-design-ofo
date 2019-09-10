import React, {Component} from 'react'
import {Card, Button, Form, Input, Select, Modal, message, Tree} from 'antd'
import BaseTable from '../../components/BaseTable'
import columns from './columns'
import axios from '../../utils/request'
import Utils from '../../utils/utils'
import menuConfig from '../../config/menuConfig'

const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;
export default class Permission extends Component {

    state = {
        isRoleVisible: false,
        selectedRowKeys: null,
        selectedItem: null,
        isPermissionVisible: false,
        detailsInfo: null,
        menuInfo:[]//接口获取的权限列表
    };

    componentDidMount() {
        this.requestList()
    }

    requestList() {
        axios.requestList(this, '/permission/list', {}, false)
    }

    // 打开创建角色弹框
    handleCreate = () => {
        this.setState({isRoleVisible: true})
    };

    // 创建角色提交
    handleRoleSubmit = () => {
        let data = this.roleForm.props.form.getFieldsValue();
        axios.ajax({
            url: 'permission/create',
            data: {
                params: data
            },
            isMock: false
        }).then(res => {
            if (res.code === 0) {
                message.success(res.message);
                this.setState({isRoleVisible: false});
                this.roleForm.props.form.resetFields();
                this.requestList()
            }
        })
    }

    // 权限设置
    handleSetting = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: '提示',
                content: '请选择一个角色'
            });
            return
        }
        this.setState({
            isPermissionVisible: true,
            detailInfo: item,
            menuInfo:item.menus
        })
    };

    // 设置权限提交
    handlePermissionEditSubmit = () => {
        let data = this.permissionForm.props.form.getFieldsValue();
        data.role_id = this.state.selectedItem.id; //某行的ID值
        data.menus = this.state.menuInfo; //选择的权限列表
        axios.ajax({
            url: 'permission/setting',
            data: {
                params: {
                    ...data
                }
            }
        }).then(res => {
            if (res.code === 0) {
                message.success(res.message);
                this.setState({isPermissionVisible: false});
                this.permissionForm.props.form.resetFields();
                this.requestList()
            }
        })
    };


    userAuthorize = () => {

    };


    render() {
        const {dataSource, selectedRowKeys} = this.state;
        return (
            <div>
                <Card title="权限设置">
                    <Button type="primary" onClick={this.handleCreate}>创建角色</Button>
                    <Button type="primary" onClick={this.handleSetting}>设置权限</Button>
                    <Button type="primary" onClick={this.userAuthorize}>用户授权</Button>
                </Card>
                <Card>
                    <BaseTable
                        updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                        selectedRowKeys={selectedRowKeys}
                        dataSource={dataSource}
                        columns={columns}
                    />
                </Card>
                <Modal
                    title="创建角色"
                    visible={this.state.isRoleVisible}
                    onOk={this.handleRoleSubmit}
                    onCancel={() => {
                        this.roleForm.props.form.resetFields()
                        this.setState({isRoleVisible: false})
                    }}
                >
                    <RoleForm wrappedComponentRef={(inst) => this.roleForm = inst}/>
                </Modal>
                <Modal
                    title="权限设置"
                    visible={this.state.isPermissionVisible}
                    onOk={this.handlePermissionEditSubmit}
                    onCancel={() => {
                        // this.permissionForm.props.form.resetFields()
                        this.setState({isPermissionVisible: false})
                    }}
                    width={600}
                >
                    <PermissionForm
                        detailInfo={this.state.detailInfo}
                        menuInfo={this.state.menuInfo}
                        patchMenuInfo={(checkedKeys) => this.setState({menuInfo: checkedKeys})}
                        wrappedComponentRef={(inst) => this.permissionForm = inst}
                    />
                </Modal>
            </div>
        )
    }
}

class RoleForm extends Component {
    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 15}
        };
        return (
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    {
                        getFieldDecorator('role_name')(
                            <Input type="text" placeholder="请输入角色名称"/>
                        )
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        getFieldDecorator('state')(
                            <Select>
                                <Option value={1}>启用</Option>
                                <Option value={0}>停用</Option>
                            </Select>
                        )
                    }
                </FormItem>
            </Form>
        )
    }
}

RoleForm = Form.create({})(RoleForm);

class PermissionForm extends Component {

    // 递归渲染权限树
    renderTreeNodes = (data) => {
        return data.map((item) => {
            if (item.children) {
                return <TreeNode title={item.title} key={item.key}>
                    {this.renderTreeNodes(item.children)}
                </TreeNode>
            } else {
                return <TreeNode title={item.title} key={item.key}/>
            }
        })
    };

    // 该方法可能会产生疑惑，由于react是单向数据流，如果要修改该组件的状态，需要修改父组件的数据，再次传递该组件
    onCheck = (checkedKeys) => {
        this.props.patchMenuInfo(checkedKeys)
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 15}
        };
        const detailInfo = this.props.detailInfo;
        const menuInfo = this.props.menuInfo;
        return (
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    <Input disabled placeholder={detailInfo.user_name}/>
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        getFieldDecorator('status', {
                            initialValue: '1'
                        })(
                            <Select>
                                <Option value="1">启用</Option>
                                <Option value="0">停用</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <Tree
                    checkable
                    defaultExpandAll
                    onCheck={(checkedKeys) => {
                        this.onCheck(checkedKeys)
                    }}
                    checkedKeys={menuInfo}
                >
                    <TreeNode title="平台权限" key="platform_all">
                        {this.renderTreeNodes(menuConfig)}
                    </TreeNode>
                </Tree>
            </Form>
        )
    }
}

PermissionForm = Form.create({})(PermissionForm)
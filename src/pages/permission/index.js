import React, { Component } from 'react';
import { Card, Button, Modal, message } from 'antd';
import BaseTable from '../../components/BaseTable';
import columns from './columns';
import axios from '../../utils/request';
import Utils from '../../utils/utils';
import RoleForm from './CreateRole';
import PermissionForm from './SetPermission';
import RoleAuthForm from './UserAuthorize';

export default class Permission extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRoleVisible: false,
            selectedRowKeys: null,
            selectedItem: null,
            isPermissionVisible: false,
            // detailsInfo: null,
            menuInfo: [], // 接口获取的权限列表
            isAuthorizeVisible: false,
            targetKeys: [],
        };
    }

    componentDidMount() {
        this.requestList();
    }

    // 创建角色
    handleCreate = () => {
        this.setState({ isRoleVisible: true });
    };

    // 创建角色提交
    handleRoleSubmit = () => {
        const data = this.roleForm.props.form.getFieldsValue();
        axios
            .ajax({
                url: 'permission/create',
                data: {
                    params: data,
                },
                isMock: false,
            })
            .then(res => {
                if (res.code === 0) {
                    message.success(res.result);
                    this.setState({ isRoleVisible: false });
                    this.roleForm.props.form.resetFields();
                    this.requestList();
                }
            });
    };

    // 设置权限
    handleSetting = () => {
        const { selectedItem } = this.state;
        if (!selectedItem) {
            Modal.info({
                title: '提示',
                content: '请选择一个角色',
            });
            return;
        }
        this.setState({
            isPermissionVisible: true,
            detailInfo: selectedItem,
            menuInfo: selectedItem.menus,
        });
    };

    // 设置权限提交
    handlePermissionEditSubmit = () => {
        const data = this.permissionForm.props.form.getFieldsValue();
        const {
            selectedItem: { id },
            menuInfo,
        } = this.state;
        data.role_id = id; // 某行的ID值
        data.menus = menuInfo; // 选择的权限列表
        axios
            .ajax({
                url: 'permission/setting',
                data: {
                    params: {
                        ...data,
                    },
                },
            })
            .then(res => {
                if (res.code === 0) {
                    message.success(res.result);
                    this.setState({ isPermissionVisible: false });
                    this.permissionForm.props.form.resetFields();
                    this.requestList();
                }
            });
    };

    // 用户授权
    userAuthorize = () => {
        const { selectedItem } = this.state;
        if (!selectedItem) {
            Modal.info({
                title: '提示',
                content: '请选择一个角色',
            });
            return;
        }
        this.setState({
            isAuthorizeVisible: true,
            detailInfo: selectedItem,
        });
        this.getRoleUserList(selectedItem.id);
    };

    // 获取授权用户列表
    getRoleUserList = id => {
        axios
            .ajax({
                url: 'permission/user_list',
                data: {
                    params: { id },
                },
                isMock: false,
            })
            .then(res => {
                if (res.code === 0) {
                    this.getAuthUserList(res.result.list);
                }
            });
    };

    // 筛选目标用户
    getAuthUserList = dataSource => {
        const mockData = [];
        const targetKeys = [];
        if (dataSource && dataSource.length > 0) {
            for (let i = 0; i < dataSource.length; i + 1) {
                const data = {
                    key: dataSource[i].user_id,
                    title: dataSource[i].user_name,
                    status: dataSource[i].status,
                };
                if (data.status === 1) {
                    targetKeys.push(data.key);
                }

                mockData.push(data);
            }
            this.setState({ targetKeys, mockData });
        }
    };

    // 用户授权提交
    handleAuthorizeSubmit = () => {
        const {
            targetKeys,
            selectedItem: { id },
        } = this.state;
        const data = {
            user_ids: targetKeys,
            role_id: id,
        };
        axios
            .ajax({
                url: 'permission/user_role_edit',
                data: {
                    params: {
                        ...data,
                    },
                },
                isMock: false,
            })
            .then(res => {
                if (res.code === 0) {
                    message.success(res.result);
                    this.setState({ isAuthorizeVisible: false });
                    this.requestList();
                }
            });
    };

    requestList() {
        axios.requestList(this, '/permission/list', {}, false);
    }

    render() {
        const {
            dataSource,
            selectedRowKeys,
            isRoleVisible,
            isPermissionVisible,
            detailInfo,
            menuInfo,
            isAuthorizeVisible,
            targetKeys,
            mockData,
        } = this.state;
        return (
            <div>
                <Card title="权限设置">
                    <Button type="primary" onClick={this.handleCreate}>
                        创建角色
                    </Button>
                    <Button type="primary" onClick={this.handleSetting}>
                        设置权限
                    </Button>
                    <Button type="primary" onClick={this.userAuthorize}>
                        用户授权
                    </Button>
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
                    visible={isRoleVisible}
                    onOk={this.handleRoleSubmit}
                    onCancel={() => {
                        this.roleForm.props.form.resetFields();
                        this.setState({ isRoleVisible: false });
                    }}
                >
                    <RoleForm
                        wrappedComponentRef={inst => {
                            this.roleForm = inst;
                        }}
                    />
                </Modal>
                <Modal
                    title="权限设置"
                    visible={isPermissionVisible}
                    onOk={this.handlePermissionEditSubmit}
                    onCancel={() => {
                        // this.permissionForm.props.form.resetFields()
                        this.setState({ isPermissionVisible: false });
                    }}
                    width={600}
                >
                    <PermissionForm
                        detailInfo={detailInfo}
                        menuInfo={menuInfo}
                        patchMenuInfo={checkedKeys => this.setState({ menuInfo: checkedKeys })}
                        wrappedComponentRef={inst => {
                            this.permissionForm = inst;
                        }}
                    />
                </Modal>
                <Modal
                    title="用户授权"
                    visible={isAuthorizeVisible}
                    onOk={this.handleAuthorizeSubmit}
                    onCancel={() => {
                        this.setState({ isAuthorizeVisible: false });
                    }}
                    width={800}
                >
                    <RoleAuthForm
                        wrappedComponentRef={inst => {
                            this.permissionForm = inst;
                        }}
                        detailInfo={detailInfo}
                        targetKeys={targetKeys}
                        mockData={mockData}
                        patchMenuInfo={targetKeyss => {
                            this.setState({ targetKeys: targetKeyss });
                        }}
                    />
                </Modal>
            </div>
        );
    }
}

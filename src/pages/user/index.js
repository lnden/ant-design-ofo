import React, { Component } from 'react';
import { Card, Button, Modal, message } from 'antd';

import axios from '../../utils/request';
import Utils from '../../utils/utils';
import BaseForm from '../../components/BaseForm';
import BaseTable from '../../components/BaseTable';
import formList from './map';
import columns from './columns';
import UserForm from './UserForm';

export default class User extends Component {
    params = {
        page: 1,
    };

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            // pagination: null,
            selectedRowKeys: null,
            selectedItem: null,
        };
    }

    componentDidMount() {
        this.requestList(this.params);
    }

    handleFilter = params => {
        this.params = params;
        this.requestList(this.params);
    };

    // 功能区操作
    handleOperate = type => {
        const { selectedItem } = this.state;
        if (type !== 'create' && !selectedItem) {
            Modal.info({
                title: '提示',
                content: '请选择一个用户',
            });
            return;
        }
        switch (type) {
            case 'create':
                this.setState({
                    type,
                    isVisible: true,
                    title: '创建员工',
                    userInfo: null,
                });
                break;
            case 'edit':
                this.setState({
                    type,
                    isVisible: true,
                    title: '编辑员工',
                    userInfo: selectedItem,
                });
                break;
            case 'detail':
                this.setState({
                    type,
                    isVisible: true,
                    title: '员工详情',
                    userInfo: selectedItem,
                });
                break;
            default:
                Modal.confirm({
                    title: '确认删除',
                    content: '是否要删除当前选中的员工',
                    onOk: () => this.handleOkDelete(),
                });
        }
    };

    handleOkDelete = () => {
        const { selectedItem } = this.state;
        axios
            .ajax({
                url: 'user/delete',
                data: {
                    params: {
                        id: selectedItem.id,
                    },
                },
                isMock: false,
            })
            .then(res => {
                if (res.code === 0) {
                    this.setState({
                        isVisible: false,
                    });
                    this.requestList(this.params);
                }
            });
    };

    // 创建员工提交
    handleSubmit = () => {
        const { type } = this.state;
        const data = this.userForm.props.form.getFieldsValue();
        axios
            .ajax({
                url: type === 'create' ? 'user/create' : 'user/edit',
                data: {
                    params: data,
                },
                isMock: false,
            })
            .then(res => {
                if (res.code === 0) {
                    this.userForm.props.form.resetFields();
                    this.setState({
                        isVisible: false,
                    });
                    message.success(res.result);
                    this.requestList(this.params);
                }
            });
    };

    requestList = page => {
        axios.requestList(this, 'user/list', page, false);
    };

    render() {
        const { type, dataSource, title, isVisible, selectedRowKeys, userInfo } = this.state;
        let footer = {};
        if (type === 'detail') {
            footer = {
                footer: null,
            };
        }
        return (
            <Card title="员工管理">
                <BaseForm layout="inline" formList={formList} filterSubmit={this.handleFilter} />
                <Card>
                    <Button type="primary" icon="plus" onClick={() => this.handleOperate('create')}>
                        创建员工
                    </Button>
                    <Button type="primary" icon="edit" onClick={() => this.handleOperate('edit')}>
                        编辑员工
                    </Button>
                    <Button type="primary" onClick={() => this.handleOperate('detail')}>
                        员工详情
                    </Button>
                    <Button
                        type="primary"
                        icon="delete"
                        onClick={() => this.handleOperate('delete')}
                    >
                        删除员工
                    </Button>
                </Card>
                <BaseTable
                    updateSelectedItem={Utils.updateSelectedItem.bind(this)}
                    selectedRowKeys={selectedRowKeys}
                    columns={columns}
                    dataSource={dataSource}
                    pagination={false}
                />
                <Modal
                    title={title}
                    visible={isVisible}
                    onOk={this.handleSubmit}
                    onCancel={() => {
                        this.userForm.props.form.resetFields();
                        this.setState({ isVisible: false });
                    }}
                    width={600}
                    {...footer}
                >
                    <UserForm
                        type={type}
                        userInfo={userInfo}
                        wrappedComponentRef={inst => {
                            this.userForm = inst;
                        }}
                    />
                </Modal>
            </Card>
        );
    }
}

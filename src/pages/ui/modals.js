import React, { Component } from 'react';
import { Card, Button, Modal } from 'antd';
import './ui.css';

export default class Modals extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal1: false,
            showModal2: false,
            showModal3: false,
            showModal4: false,
        };
    }

    handleOpen = type => {
        this.setState({ [type]: true });
    };

    handleConfirm = type => {
        Modal[type]({
            title: '确认?',
            content: '你确定你学会了React了吗?',
            onOk() {
                // console.log('ok');
            },
            onCancel() {
                // console.log('cancel');
            },
        });
    };

    render() {
        const { showModal1, showModal2, showModal3, showModal4 } = this.state;
        return (
            <div>
                <Card title="基础模态框">
                    <Button type="primary" onClick={() => this.handleOpen('showModal1')}>
                        Open
                    </Button>
                    <Button type="primary" onClick={() => this.handleOpen('showModal2')}>
                        自定义页脚
                    </Button>
                    <Button type="primary" onClick={() => this.handleOpen('showModal3')}>
                        顶部20px弹框
                    </Button>
                    <Button type="primary" onClick={() => this.handleOpen('showModal4')}>
                        水平垂直居中
                    </Button>
                </Card>
                <Card title="信息确认框">
                    <Button type="primary" onClick={() => this.handleConfirm('confirm')}>
                        Confirm
                    </Button>
                    <Button type="primary" onClick={() => this.handleConfirm('info')}>
                        Info
                    </Button>
                    <Button type="primary" onClick={() => this.handleConfirm('success')}>
                        Success
                    </Button>
                    <Button type="primary" onClick={() => this.handleConfirm('warning')}>
                        Warning
                    </Button>
                </Card>
                <Modal
                    title="React"
                    visible={showModal1}
                    onCancel={() => {
                        this.setState({ showModal1: false });
                    }}
                >
                    <p>欢迎您使用弹框组件Modal</p>
                </Modal>
                <Modal
                    title="自定义页脚"
                    visible={showModal2}
                    okText="好的"
                    cancelText="算了"
                    onCancel={() => {
                        this.setState({ showModal2: false });
                    }}
                >
                    <p>欢迎您使用弹框组件Modal</p>
                </Modal>

                <Modal
                    title="顶部20px弹框"
                    style={{ top: 20 }}
                    visible={showModal3}
                    onCancel={() => {
                        this.setState({ showModal3: false });
                    }}
                >
                    <p>欢迎您使用弹框组件Modal</p>
                </Modal>

                <Modal
                    title="水平垂直居中"
                    wrapClassName="vertical-center-modal"
                    visible={showModal4}
                    onCancel={() => {
                        this.setState({ showModal4: false });
                    }}
                >
                    <p>欢迎您使用弹框组件Modal</p>
                </Modal>
            </div>
        );
    }
}

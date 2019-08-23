import React, { Component } from 'react'
import { Card, Button, Modal } from 'antd'
import './ui.less'

export default class Modals extends Component {

    state = {
        showModal1: false,
        showModal2: false,
        showModal3: false,
        showModal4: false,

    }
    handleOpen = (type) => {
        this.setState({ [type]: true })
    }

    render() {
        const { showModal1, showModal2, showModal3, showModal4 } = this.state;
        return (
            <div>
                <Card title="基础模态框">
                    <Button type="primary" onClick={() => this.handleOpen('showModal1')}>Open</Button>
                    <Button type="primary" onClick={() => this.handleOpen('showModal2')}>自定义页脚</Button>
                    <Button type="primary" onClick={() => this.handleOpen('showModal3')}>顶部20px弹框</Button>
                    <Button type="primary" onClick={() => this.handleOpen('showModal4')}>水平垂直居中</Button>
                </Card>
                <Card title="信息确认模态框">

                </Card>
                <Modal
                    title="React"
                    visible={showModal1}
                    onCancel={() => {
                        this.setState({ showModal1: false })
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
                        this.setState({ showModal2: false })
                    }}

                >
                    <p>欢迎您使用弹框组件Modal</p>
                </Modal>

                <Modal
                    title="顶部20px弹框"
                    style={{ top: 20 }}
                    visible={showModal3}
                    onCancel={() => {
                        this.setState({ showModal3: false })
                    }}

                >
                    <p>欢迎您使用弹框组件Modal</p>
                </Modal>

                <Modal
                    title="水平垂直居中"
                    wrapClassName="vertical-center-modal"
                    visible={showModal4}
                    onCancel={() => {
                        this.setState({ showModal4: false })
                    }}

                >
                    <p>欢迎您使用弹框组件Modal</p>
                </Modal>
            </div>
        )
    }
}
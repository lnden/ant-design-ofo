import React, { Component } from 'react';
import { Card, Button, Icon, Radio, Divider } from 'antd';

const ButtonGroup = Button.Group;
const RadioGroup = Radio.Group;
export default class Buttons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            size: 'default',
        };
    }

    handleClickLoading = () => {
        const { loading } = this.state;
        this.setState({ loading: !loading });
    };

    handleSizeChange = e => {
        this.setState({ size: e.target.value });
    };

    render() {
        const { loading, size } = this.state;
        return (
            <div>
                <Card title="基础按钮">
                    <Button type="primary">主按钮</Button>
                    <Button>普通按钮</Button>
                    <Button type="dashed">虚线按钮</Button>
                    <Button type="danger">危险按钮</Button>
                    <Button disabled>普通按钮</Button>
                </Card>

                <Card title="图形按钮">
                    <Button icon="plus">创建按钮</Button>
                    <Button icon="edit">编辑按钮</Button>
                    <Button icon="delete">删除按钮</Button>
                    <Button shape="circle" icon="search" />
                    <Button type="primary" icon="search">
                        搜索按钮
                    </Button>
                    <Button type="primary" icon="download">
                        下载按钮
                    </Button>
                    <a href="https://ant.design/components/icon-cn/">Icon</a>
                </Card>

                <Card title="loading按钮">
                    <Button type="primary" loading={loading}>
                        确定
                    </Button>
                    <Button type="primary" shape="circle" loading={loading} />
                    <Button loading={loading}>点击加载</Button>
                    <Button shape="circle" loading={loading} />
                    <Button type="primary" onClick={this.handleClickLoading}>
                        关闭按钮
                    </Button>
                </Card>

                <Card title="按钮组">
                    <ButtonGroup>
                        <Button type="primary">
                            <Icon type="left" />
                            返回
                        </Button>
                        <Button type="primary">
                            前进
                            <Icon type="right" />
                        </Button>
                    </ButtonGroup>
                </Card>

                <Card title="按钮尺寸">
                    <RadioGroup value={size} onChange={this.handleSizeChange}>
                        <Radio value="large">Large</Radio>
                        <Radio value="default">Default</Radio>
                        <Radio value="small">Small</Radio>
                    </RadioGroup>
                    <Divider type="vertical" />
                    <Button size={size} type="primary">
                        主按钮
                    </Button>
                    <Button size={size}>普通按钮</Button>
                    <Button size={size} type="dashed">
                        虚线按钮
                    </Button>
                    <Button size={size} type="danger">
                        危险按钮
                    </Button>
                    <Button size={size} disabled>
                        普通按钮
                    </Button>
                </Card>
            </div>
        );
    }
}

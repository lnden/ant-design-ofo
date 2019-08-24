import React, { Component } from 'react'
import { Card, Tabs, message, Icon } from 'antd'

const TabPane = Tabs.TabPane;

export default class Lindong extends Component {

    newTabIndex = 0

    state = {
        panes: [],
        activeKey: '1'
    }

    handleSwitch = (activeKey) => {
        this.setState({ activeKey })
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey)
    }

    add = () => {
        const panes = this.state.panes;
        const activeKey = `newTba${this.newTabIndex++}`;
        panes.push({ title: activeKey, content: `New Tab Pane + ${activeKey}`, key: activeKey })
        this.setState({ panes, activeKey })
    }

    /**
     * activeKey 当前打开页签的key
     * targetKey 当前需要删除的key
     */
    remove = (targetKey) => {
        let { activeKey } = this.state;
        let lastIndex;
        //当前删除的和打开key是否是一个值
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                //删除和打开的key是第二位，关闭之后选中状态要落到前一个上面，当前i=1，i-1=0，选中状态锁定在第一位
                lastIndex = i - 1;
            }
        })

        //过滤剩余的两个页签
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        
        //48-55 old version
        //判断大于等于0  && 选中key等于目标key  [如果小于0点击的应该是第一个不成立]
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
        }
        //此处ant-design为做处理，自行优化 [选中状态在第一个，并且删除第一个的情况向后选着]
        if (lastIndex < 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex + 1].key;
        }
        //58~64 new version
        if (panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
              activeKey = panes[lastIndex].key;
            } else {
              activeKey = panes[0].key;
            }
        }
        this.setState({ panes, activeKey })
    }

    handleCallback = (key) => {
        message.info('Hi 您选着了页签：' + key);
    }

    componentWillMount() {
        const panes = [
            {
                title: 'Tab 1',
                content: 'Content of tab Pan 1',
                key: '1'
            },
            {
                title: 'Tab 2',
                content: 'Content of tab Pan 2',
                key: '2'
            },
            {
                title: 'Tab 3',
                content: 'Content of tab Pan 3',
                key: '3'
            }
        ]
        this.setState({ panes, activeKey: panes[0].key })
    }

    render() {
        return (
            <div>
                <Card title="Tab页签">
                    <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                        <TabPane tab="Tab 1" key="1">Content of tab Pan 1</TabPane>
                        <TabPane tab="Tab 2" key="2">Content of tab Pan 2</TabPane>
                        <TabPane tab="Tab 3" key="3">Content of tab Pan 3</TabPane>
                    </Tabs>
                </Card>

                <Card title="Tab带图的页签">
                    <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                        <TabPane tab={<span><img alt="tabs" src="//www.baidu.com/img/bd_logo1.png?qua=high&where=super" width="20" />Tab 1</span>} key="1">Content of tab Pan 1</TabPane>
                        <TabPane tab={<span><Icon type="edit" />Tab 1</span>} key="2">Content of tab Pan 2</TabPane>
                        <TabPane tab={<span><Icon type="delete" />Tab 1</span>} key="3">Content of tab Pan 3</TabPane>
                    </Tabs>
                </Card>

                <Card title="Tab动态增加">
                    <Tabs
                        onChange={this.handleSwitch}
                        activeKey={this.state.activeKey}
                        type="editable-card"
                        onEdit={this.onEdit}
                    >
                        {
                            this.state.panes.map(item => {
                                return <TabPane tab={item.title} key={item.key}>{item.content}</TabPane>
                            })
                        }
                    </Tabs>
                </Card>
            </div>
        )
    }
}
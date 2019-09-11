import React, {Component} from 'react'
import {Menu, Icon} from 'antd'
import menuList from '../../config/menuConfig'
import './index.less'

const {SubMenu} = Menu;
const MenuItem = Menu.Item;

export default class MenuList extends Component {

    state = {
        menuTreeNode:null
    };

    componentWillMount() {
        const menuTreeNode = this.renderMenuList(menuList);
        this.setState({menuTreeNode})
    }

    // 递归渲染菜单
    renderMenuList = (data) => {
        if (data && data.length) {
            return data.map(item => {
                if (item.children && item.children.length) {
                    return (
                        <SubMenu key={item.key} title={item.title}>
                            {this.renderMenuList(item.children)}
                        </SubMenu>
                    )
                } else {
                    return <MenuItem key={item.key}><span>{item.title}</span></MenuItem>
                }
            })
        }
    };

    render() {
        return (
            <div>
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt="logo"/>
                    <h1>IMOOC MS</h1>
                </div>
                <Menu
                    defaultSelectedKeys={['2']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    theme="dark"
                >
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        )
    }
}
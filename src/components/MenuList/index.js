import React, {Component} from 'react'
import {Menu} from 'antd'
import {NavLink} from 'react-router-dom'
import menuList from '../../config/menuConfig'
import { connect } from 'react-redux'
import { switchMenu } from '../../redux/action'
import './index.less'

const {SubMenu} = Menu;
const MenuItem = Menu.Item;

class MenuList extends Component {

    state = {
        menuTreeNode: null,
        defaultKey:[''],// '/ul'
        currentKey:''//当前点击的key '/ul/buttons'
    };

    componentWillMount() {
        const menuTreeNode = this.renderMenuList(menuList);
        this.setState({menuTreeNode})

        // 使用原生js获取URL地址[可以调研router其它方法]
        // 1.刷新页面选中当前url展示的导航
        // 2.刷新页面展开当前选中的Submenu
        const Hash = window.location.hash;
        const URL = Hash.slice(1,Hash.length)
        const defaultKey = `/${URL.split('/')[1]}`;
        this.setState({currentKey:URL,defaultKey})

        // location.hash.replace(/#/g,''); //  /city?a=1
        // location.hash.replace(/#|\?.*$/g,'');  //  /city
    }

    // 递归渲染菜单
    renderMenuList = (data) => {
        if (data && data.length) {
            return data.map(item => {
                if (item.children && item.children.length) {
                    return (
                        <SubMenu title={item.title} key={item.key}>
                            {this.renderMenuList(item.children)}
                        </SubMenu>
                    )
                } else {
                    return (
                        <MenuItem title={item.title} key={item.key} >
                            <NavLink to={item.key}>{item.title}</NavLink>
                        </MenuItem>
                    )
                }
            })
        }
    };

    handleClick = ({item,key}) => {
        if(key===this.state.currentKey)return false;
        const {dispatch} = this.props;
        dispatch(switchMenu(item.props.title));
        this.setState({currentKey:key})
    }

    render() {
        const { currentKey,defaultKey } = this.state;
        return (
            <div>
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt="logo"/>
                    <h1>IMOOC MS</h1>
                </div>
                <Menu
                    selectedKeys={[currentKey]}
                    defaultOpenKeys={[defaultKey]}
                    onClick={this.handleClick}
                    mode="inline"
                    theme="dark"
                >
                    {this.state.menuTreeNode}
                </Menu>
            </div>
        )
    }
}
export default connect()(MenuList)
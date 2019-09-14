简体中文 | [English](./README.md) 

### Description

该项目主要是针对 ant-design 配合 react、react-redux、react-router-dom4.0 以及第三方插件BMap、Echarts、Easy-mock来实现的基础应用。

> Imooc React全家桶+AntD共享单车后台管理系统开发

### Catalogue

- components
    - BaseForm //表单封装
    - BaseTable //表格封装
    - MenuList //路由列表
    - PublicFooter //公共页脚
    - PublicHeader //公共页头
- config
    - constant //常量定义
    - menuConfig //映射的路由列表[可由后台返回]
    - theme //ant-design主题色更换
- layout
    - BasicLayout //基础布局
    - PublicLayout //公共布局
- pages
    - ui // 存入 ant-design 一些UI组件
    - form // antd 表单基础使用
    - table // 写入简单表格以及复杂表格的示例
    - city // 初次编写查询列表结构
    - order // 编写可复用组件查询组件、表格组件   
    - user // 复用模式完成 查询、功能、列表
    - map // 使用BMap创建地点、线路、区域
    - charts //使用echarts创建 bar、pie、line
    - rich //使用富文本编辑器，并且转换为html输出
    - permission //权限设置 用户-角色-权限
    - login //登录页面预备
    - home //首页，使用两用样式方式sass、less
    - reouter-dom //react-router-dom demo
- services
    - city //城市管理接口
    - order //订单管理接口
- styles
    - common //公共样式，布局样式
    - default //antd默认样式
    - loading //全局loading动效
- utils
    - filter //常量过滤
    - request //请求封装
    - utils //公共方法
 

### Depend

```
yarn add antd --save
yarn add moment --save
yarn add axios --save
yarn add echarts-for-react echarts --save
yarn add react-draft-wysiwyg draftjs-to-html --save
yarn add react-router-dom --save
yarn add node-sass sass-loader --save
yarn add less less-loader --save
yarn add babel-plugin-import --save
yarn add jsonp --save
yarn add redux-devtools-extension --save
```

### Feature

该项目使用 Easy-mock 模拟前端数据，由于mock数据服务器不稳定，所以把请求内容存放在public/api/目录下，请求添加isMock来区分是否使用mock数据。如果不使用mock数据，请求本地数据，已经在request方法内增加优化 `options.isMock?options.url:options.url+'.json'`

#### echarts
- 全部引入、按需引入
- 设置主题色
- 使用 echarts-for-react 应用 echarts

#### permission

- 用户、角色的概念
    - 用户：用户是指系统的登录用户，可以理解为一系列的人员，例如张三、李四
    - 角色：用户登录系统划分角色，根据角色划分对应的权限
    
- 权限模型
    - 传统的权限模型：用户到权限，登录系统自动获取当前登录人的权限，没有角色的概念
    - RBAC权限模型：某个人划分到指定角色，权限/菜单是跟着角色走的，用户被分配某个角色，某个角色拥有某个权限
    
- permission Tree question

两种方式渲染树结构，一种是后台返回所有的树结构，另一种方式前端自定义好数据渲染，该项目使用本地定义列表。

- 使用sass或者less 
create-react-app构建项目应用使用sass方法
首先需要安装node-sass sass-loader 从新启动项目就可以使用sass文件了
首先需要安装 less less-loader 配置对应的文件config/webpack.config.js,具体查看commit提交记录e0b1a8

- 按需加载antd样式

修改less文件两种方式一种是在eject之前使用官方推荐的方式，使用的是官方推荐的 高级配置、babel-plugin-import 使用插件去修改
另外一种方式是在npm run eject 之后修改配置文件，社区自行探索。安装 babel-plugin-import 修改 webpack.config 配置文件，详情见内注解commit记录a5e0fb

### redux usage steps

- 使用redux需求描述：为完成头部组件面包屑处 展示对应菜单名称

- 需求分析：

&emsp;&emsp;1.菜单使用 ant-design Menu 组件渲染，查看相关Api得知，点击 MenuItem 调用函数 `function({ item, key })`可以获取当前点击的菜单自定义title以及key的信息。

&emsp;&emsp;2.在每次点击 MenuItem 的时候发送 dispatch 修改 state menuName 的值。

&emsp;&emsp;3.在头部组件内接收 redux state menuName 的值渲染到面包屑的位置。

- 具体执行步骤：

&emsp;&emsp;1.下载 redux react-redux 相关依赖

&emsp;&emsp;2.创建redux相关文件
```
./src
    redux
        action
            index.js
        reducer
            index.js
        index.js
```
具体内容查看如上文件，主要流程如下,入口为src/redux/index.js
```
// redux/action/index.js
const type ={
    SWITCH_MENU : 'SWITCH_MENU'
}

function switchMenu(menuName){
    return {
        type:type.SWITCH_MENU,
        menuName
    }
}

// redux/reducer/index.js
const reducer = (state,action) => {
    switch(action.type){
        case type.SWITCH_MENU:
            return {
                ...state,
                menuName: action.menuName
            };
        default:
            return { ...state }
    }
}

// redux/index.js
import {createStore} from 'react-redux'
const initialState = {
    menuName:''
}
const configStore = () => createStore(reducer,initialState)
```

&emsp;&emsp;3.使用Provider容器包裹组件，并且传入全局store 文件存放/src/index.js
```
import {Provider} from 'react-redux'
import configStore from './redux/index.js'

const store = configStore();

<Provider store={store}>
    <Router />
</Provider>
```

&emsp;&emsp;4.使用connect连接redux与组件，在组件内发送dispatch
```
class MenuList extends Component {}
export default connect()(MenuList)

handleClick = ({item,key}) => {
    const {dispatch} = this.props;
    dispatch(switchMenu(item.props.title));
}
```

&emsp;&emsp;5.使用connect连接redux与组件，在组件内接收state的值
```
class PublicHeader extends Component {
    render() {
        // 重点部分，使用connect并添加mapStateToProps使redux state 转换为
        console.log(this.props.menuName)
        return (<div>内容部分</div>)
    }
}

const mapStateToProps = state => {
    return {
        menuName: state.menuName
    }
}
export default connect(mapStateToProps)(PublicHeader)
```

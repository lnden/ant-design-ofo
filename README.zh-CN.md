简体中文 | [English](./README.md) | [提交规范](./README.norm.md)

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
- redux
    - action 
    - reducer
    - index.js
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
yarn add redux react-redux --save
yarn add redux-devtools-extension --save
```
由于 create-react-app 初始化项目依赖全部安装在 dependencies，你可能会想 dependencies 是生产环境，devdependencies 是开发环境，脚手架怎么没有区分呢，在这里不做过多的解释，github上面有相关issues。这里我们手动区分安装依赖，初始化安装的依赖，我们放在开发环境中devdependencies，后续学习使用的包，我们安装在生产环境dependencies，仅做与区分。

### Feature

#### easy-mock
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

#### redux usage steps
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

> version v1.0.0 该版本主要使用 antd 基础组件搭建页面、使用按需加载antd、系统同时使用sass/less语法、提取常量、封装公用组件、以及百度地图、Echarts图表应用、设计权限、接入 react-redux 等功能

### Eslint
由于 create-react-app 已经为我们添加了eslint规则，所以eslint一些基本依赖就不需要重新下载了。

手动配置eslint步骤如下：

- 1.根目录下生成eslint配置文件.eslintrc、生成eslint忽略文件.eslintignore
- 2.安装使用相关依赖
```$xslt
yarn add eslint-config-airbnb -S
yarn add eslint-plugin-compat -S
```
- 3.修改package.json添加启动指令
```$xslt
"lint": "eslint --fix --ext .js --ext .jsx src/",
```

#### Eslint配置详解[EslintConfig](https://cn.eslint.org/docs/user-guide/configuring)
.eslintrc被设计为完全可配置的，这意味着你可以关闭每一个规则而只运行基本语法验证，或混合和匹配 ESLint 默认绑定的规则和你的自定义规则，以让 ESLint 更适合你的项目。有两种主要的方式来配置 ESLint：
- 1.Configuration Comments - 使用 JavaScript 注释把配置信息直接嵌入到一个代码源文件中。
- 2.Configuration Files - 使用 JavaScript、JSON 或者 YAML 文件为整个目录（处理你的主目录）和它的子目录指定配置信息。可以配置一个独立的 .eslintrc.* 文件，或者直接在 package.json 文件里的 eslintConfig 字段指定配置，ESLint 会查找和自动读取它们，再者，你可以在命令行运行时指定一个任意的配置文件。

##### Specifying Parser Options
```$xslt
"parserOptions": {
    "desc": "- 这是个对象，表示你想使用的额外的语言特性",
    "ecmaFeatures": { 
        "desc": "启用实验性的语法",
        "experimentalObjectRestSpread": true,
        "legacyDecotators": true
    }
}
```

##### Specifying Parser
```$xslt
    "desc": "一个对Babel解析器的包装，使其能够与 ESLint 兼容。",
    "parser": "babel-eslint"
```

##### Configuring Rules
ESLint 附带有大量的规则。你可以使用注释或配置文件修改你项目中要使用的规则。要改变一个规则设置，你必须将规则 ID 设置为下列值之一

- "off" 或 0 - 关闭规则
- "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
- "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
   
##### dev content
- [legacyDecotators](https://github.com/babel/babel-eslint/releases)
- [airbnb](https://github.com/airbnb/javascript)
- [airbnb-ch](https://github.com/lin-123/javascript#types)
- [eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y)
- [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)

### Stylelint
A mighty, modern linter that helps you avoid errors and enforce conventions in your styles.

手动配置stylelint步骤如下：

- 1.根目录下生成stylelint配置文件.stylelintrc
- 2.install depend
```$xslt
yarn add stylelint -S
yarn add stylelint-config-css-modules -S
yarn add stylelint-config-prettier -S
yarn add stylelint-config-standard -S
yarn add stylelint-scss" -S
```
- 修改package.json文件，添加启动指令
```$xslt
"stylelint": "stylelint --fix src/**/*.less",
```
#### Stylelint配置详情[StylelintConfig](https://stylelint.io/user-guide/configuration#extends)
.stylelintrc The linter expects a configuration object. You can either craft your own config or extend an existing one.

##### Extends
```$xslt
{
    "extends": ["stylelint-config-standard", "stylelint-config-prettier", "stylelint-config-css-modules"]
}
```

##### Plugins
```$xslt
{
    "extends": ["stylelint-config-standard", "stylelint-config-prettier", "stylelint-config-css-modules"],
    "plugins": [
        "stylelint-scss"
    ],
}

```

##### Rules
```$xslt
{
    "extends": ["stylelint-config-standard", "stylelint-config-prettier", "stylelint-config-css-modules"],
    "plugins": [
        "stylelint-scss"
    ],
    "rules": {
        "indentation": "tab",
        "number-leading-zero": null
    }
}
```
stylelint国内翻译的文档较少，使用方式与eslint相似

### Prettier
Prettier is an opinionated code formatter with support

手动配置prettier步骤如下：

- 1.根目录下生成prettier配置文件.prettierrc
- 2.安装使用相关依赖
```$xslt
yarn add prettier -S
yarn add prettier-eslint -S
yarn add prettier-eslint-cli -S
yarn add eslint-plugin-prettier -S
yarn add eslint-config-prettier -S
```
- 3.修改package.json添加启动指令
```$xslt
"format": "prettier-eslint --write src/**/*.{js,less}",
```
#### Prettier配置详解[PrettierConfig](https://prettier.io/docs/en/options.html#quotes)
.prettierrc Prettier ships with a handful of customizable format options, usable in both the CLI and API.

### Commit总结

前面我们已经实现eslint、stylelint、prettier提高代码质量，操作npm run lint/stylelint/format 格式化代码片段，这样可以很好的提高代码质量，但是每次操作都需要手动执行。

这时候我们设想在代码提交的时候格式化代码，如果有什么问题给出对象警告。

配置步骤如下：

- 1.安装使用相关依赖
```$xslt
yarn add husky -S
yarn add lint-staged -S
```
- 2.修改package.json添加启动指令
```$xslt
"precommit": "lint-staged"

"lint-staged": {
    "**/*.{js,jsx,scss,json,less}": [
        "prettier-eslint --write",
        "git add"
    ],
    "**/*.{js,jsx}": "eslint --ext .js",
    "**/*.{scss}": "stylelint --syntax scss",
    "**/*.{less}": "stylelint --syntax less"
}
```
每次提交代码的时候都会执行eslint/stylelint/prettier校验代码，能自动修复的自动修复，不能修复的在控制台给出对应警告。

我们做一个测试，在src/demo/index.js新建一个组件，并且写入不规则代码，首次提交commit 这时候提交控制台会出现对应警告，第二次提交会消除一些可以自动修复的警告，但是还会出现如下报错，报错信息如下：
```
error  Delete `··`      prettier/prettier
```
就因为这个报错信息，导致我挣扎了很久都没把这个部分代码提交，最后我发现是因为.eslintrc里面配置了prettier导致的。
```$xslt
"extends": ["plugin:prettier/recommended"],
```
这个时候我猜肯定是eslint与preitter功能冲突了，当我查询了很多文档，以及国内外的github，焦头烂额的时候，我发现Webstorm编辑上面也会报错，缩进处标记这着红色波浪线，鼠标放在上面的时候报错信息与上面一致。我就在想是缩进出现的问题。

这个时候冒着试试的方式在根目录下添加.editorconfig配置文件，修改缩进为4。这个时候再次commit可以了，报错信息也没有了。

就在我准备这个报错信息在README记录的时候，我突然在想，既然是缩进导致的，eslint我设置的是4，那我的看看.prettierrc设置的是几，配置文件内没有配置，那我就去官方去看看默认配置的是几[PrettierConfig](https://prettier.io/docs/en/options.html#tabs),结果查看 `tabWidth` 默认是2。

这时候我赶紧把根目录下面的.editorconfig配置文件删除，在.prettierrc配置 `"tabWidth": 4` 代码回撤，重新commit 这时候也没有报错，提交成功。

nice~  这个报错终于解决了，并且也找到了相应的解决方案。我觉得应该把.prettierrc配置上并且根目录下也配置editorconfig。这样报错信息解决了，另一方面也能保证大家协同开发了。
 

### Animate

switch nav run animate

```$xslt
yarn add react-transition-group -S
```
切换导航更换内容区动画暂不添加

### Babel

#### Decorators
为 create-react-app 添加最新提案语法支持 decorators 装饰器

- 1.安装依赖
```$xslt
yarn add @babel/plugin-proposal-decorators -S
```
- 2.修改config/webpack.config.js配置文件
```$xslt
[
    require.resolve('@babel/plugin-proposal-decorators'),
    {
        legacy: true
    }
]
```
- 3.重新启动项目使用@装饰器

具体使用内容见src/pages/home/index.js

配置详细信息 [CSDN](https://blog.csdn.net/daydream13580130043/article/details/90511322)、[思否](https://segmentfault.com/a/1190000017162255)


#### Optional-chaining
为 create-react-app 添加最新提案语法支持 Optional-chaining 链判断运算符

- 1.安装依赖
```$xslt
yarn add @babel/plugin-proposal-optional-chaining -S
```
- 2.修改config/webpack.config.js配置文件
```$xslt
[require.resolve('@babel/plugin-proposal-optional-chaining')]
```
- 3.重新启动项目使用链判断运算符
具体使用内容见src/pages/home/index.js

语法介绍 [ES6](http://es6.ruanyifeng.com/?search=%E8%A3%85&x=0&y=0#docs/proposals#%E9%93%BE%E5%88%A4%E6%96%AD%E8%BF%90%E7%AE%97%E7%AC%A6)、[Babel](https://babeljs.io/docs/en/next/babel-plugin-proposal-optional-chaining)

> version v1.1.0 该版本主要针对业务代码的格式化、规范化操作，添加 Eslint、Stylelint、Prettier 等检查工具。设置代码提交 commit 之后自动检测代码是否规范，自动修正可预测问题，手动修复console警告。另外还使用 @babel/plugin 等插件，使用 ECMAScript 提案性语法。 

### Useing Dvajs

使用 create-react-app 创建项目接入 react-redux 把各个页面的数据源存入 redux ，这样对应每个页面都产生一个 store/ 包括acrions、reducer、state，这样来开发一个大项目不以利于后期的维护，取而代之react-redux 为 dvajs，dva是在redux基础上的一层封装，广泛应用于阿里、蚂蚁金服。

本项目只针对 react-redux 实现了一个简单的面包屑功能，如果想了解 react-redux 使用方法请查看 [xxxxx](xxxxx)

v1.3.0 版本计划对 create-react-app 进行 dva 的接入，接入流程查看 [Useing dvajs](./README.dva.md)，并且添加国家语言切换功能

### Setting Language

项目已经配置切换为 dva 来控制 store 数据源了，接下来我们要使用 store 给项目添加国际化多语言，我首先简单介绍下国际化和store数据结构的设计：

此处采用 immutable 数据格式，把数据存于 model，同样国际化的判断参数定为： i18n 存于app的model中，取值来源于浏览器的本地缓存localStorage用户若设置了某种语言，则存在这里，用户下次访问系统，也依然能唤起上次所选中的语言，当初次访问时，语言默认先取自浏览器，若依然取不到则默认咱们的中文。

这里我们只实现 中文，英文，繁体 三种语言的国家化即可，因为引用了antd组件库，故此处国际化部分包括两部分，

- （1）antd库的国际化，比如antd中的固定组件里的 ‘确定，OK’‘下一页，Next Page’等，antd官网有详细说明

- （2）业务框架自己的国际化，比如“用户名，Username”，“密码，Password”等，这里采用react-intl国际化组件实现


#### 安装immutable和react-intl
```
yarn add immutable react-intl -S
npm install immutable react-intl -S
```
这里我简单介绍下，react-intl是一个国际化的第三方库，目前最新版本为3.3.2，我们切换为2.X的版本来使用该教程

修改models目录下的app.js中引入import {Map} from 'immutable' 如下

```
import {Map} from 'immutable';

const initState = Map({
    i18n: 'zh_CN'
})

export default {
    namespace: 'app',   
    state:initState,
    subscriptions: {},    
    effects: {
        * changeLang ({payload: {value}}, { put }) {
            yield put({ type: 'updateLang', payload: {value}});
        }
    
    },
    reducers: {
        updateLang (state,{payload:{value}}) {
            return state.set('i18n',value);
        },
    }
};
```
修改routers目录下BBB.js如下（在页面添加切换语言功能，并且触发dispatch修改state数据）

```
import React, { Component } from 'react';
import {connect} from 'dva';
import { Link } from 'dva/router';
import {Row, Col, Dropdown, Menu, Button} from 'antd'

const MenuItem = Menu.Item;

class BBB extends Component {

    changeLang=(e)=>{
        const {dispatch} = this.props;
        dispatch({
            type:'app/changeLang',
            payload:{
                value:e.key
            }
        })
    }
    
    render() {
        const {i18n} = this.props;
        const menu=(
            <Menu 
                onClick={this.changeLang}
                selectedKeys={[i18n]}
            >
                <MenuItem key="zh_CN">中文</MenuItem>
                <MenuItem key="en_US">英文</MenuItem>
                <MenuItem key="zh_HK">繁体</MenuItem>
            </Menu>
        )
        
        return (
            <div>
                <p>
                BBB页
                </p>
                <Link to={'/aaa'}>去AAA页面</Link>
                <br />
                <Link to={'/ccc'}>去CCC页面</Link>
                
                <Row>
                    <Col offset={2}>
                        <Dropdown trigger={['click']} overlay={menu}>
                            <Button>{i18n=='zh_CN'?'中文':i18n=='en_US'?'英文':'繁体'}</Button>
                        </Dropdown>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default connect(({
app
})=>({
i18n:app.get('i18n')
}))(BBB)
```
上修改主要功能：

app.js 增加初始语言参数i18n,增加effects和reducers方法，用于接收语言切换的action，并存储选中的key值

BBB.js 增加connect使当前组件接入store数据，增加切换组件，用于点击切换语言，并dispatch一个action给app/changeLang，触发修改修改model数据。

到这里，数据层面的流程已经打通，接下来处理国际化逻辑，国际化组件必然放于跟组件或最外层组件包裹，这样全局均可以使用并生效

#### 创建Locale组件

在src目录下，新建locale组件，Locale组件为国际化报错组件，外层为antd组件、内层为业务文案国际化解决方案，并且根据store的变化来切换语言的使用
[locale](./src/locale.js)

#### 创建locales存放文案 

在src目录下，新建locales目录，里面新建index.js文件，此目录用于存放所有项目的文案国际化文件
[locales](./src/locales)

#### 包裹展示国际化内容

修改src/routers.js文件，使用包裹组件<Locale>对需要进行国际化的内容进行包裹
[routers](./src/routers.js)

#### 使用antd组件、业务文案

修改BBB组件，增加injectIntl国际化的接入，并增加三个示例，两个antd组件 分页和日期，一个业务文案 用户名和密码
[BBB组件](./src/routes/BBB.js)



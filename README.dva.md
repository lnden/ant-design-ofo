### create-react-app 接入 dva

#### 安装create-react-app
[create-react-app](https://github.com/facebook/create-react-app)

安装完成之后进入项目，启动项目 yarn start/npm start

注意scripts执行命令中有一个eject，意为弹射暴露出所有配置，其实脚手架还是为我们封装了一些东西的，这里我们就暴露出所有配置吧。运行npm run eject，注意!该指令不可逆，一旦生成则无法还原。一旦选择eject，那么所封装的组件依赖和项目结构会有所变化。package.json文件内可以看到已经为我们安装好webpack，babel，eslint等


#### 安装dva dev
dva也有自己的脚手架dva-cli，也可快速构建项目，目前已升至2.x版本，采用react-router@4.x路由版本
```
yarn add dva -S || npm install dva -S
yarn add history -S || npm install history -S
```

#### 改造项目为dva目录模式
在src目录下新建目录：models，services，routes，utils（utils将来存放配置文件和工具方法）


#### 路由设计
简单点暂设计为三个demo地址，分别如下
- http://localhost:3000/aaa
- http://localhost:3000/aaa/bbb
- http://localhost:3000/ccc

#### 组件设计
在routes目录下新建三个文件：AAA.js / BBB.js / CCC.js

#### model设计
在model下新建四个文件：aaa.js bbb.js ccc.js 和app.js(app作为全局model使用，将来存放全局变量，如国际化参数，登录用户信息等)


#### router设计
在src目录下创建routers.js路由控制文件，其中menuGlobal提出到配置文件中，便于管理和后期拓展。大家发现其中也定义了id，pid，name，icon等字段，这些并不是dva路由必须字段，没错这些事自定义的字段，将来会用到，菜单关系，菜单是否显示，和icon图标等


#### 修改src目录下index.js入口文件
```
import dva from 'dva';
import './index.css';
import createHistory from 'history/createBrowserHistory'
 
// 1. Initialize
const app = dva({
    history:createHistory()
});
 
// 2. Plugins
// app.use({});
 
// 3. Model
app.model(require('./models/app').default);
 
// 4. Router
app.router(require('./router').default);
 
// 5. Start
app.start('#root');
```
#### 组件优化
routes 组件内添加 Link 跳转组件，并且添加 antd UI 样式

[CSDN](https://blog.csdn.net/xw505501936/article/details/80621740)

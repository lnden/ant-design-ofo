简体中文 | [English](./README.md) 

### Description

该项目主要是针对 ant-design 配合 react、react-redux、react-router-dom4.0 以及第三方插件BMap、Echarts、Easy-mock来实现的基础应用。

> Imooc React全家桶+AntD共享单车后台管理系统开发

### Catalogue

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
 

### Depend

```
yarn add antd --save
yarn add moment --save
yarn add axios --save
yarn add echarts-for-react echarts --save
yarn add react-draft-wysiwyg draftjs-to-html --save
yarn add react-router-dom --save
yarn node-sass sass-loader --save
yarn less less-loader --save
```

### Feature

该项目使用 Easy-mock 模拟前端数据，由于mock数据服务器不稳定，所以把请求内容存放在public/api/目录下，请求添加isMock来区分是否使用mock数据。如果不使用mock数据，请求本地数据，已经在request方法内增加优化 `options.isMock?options.url:options.url+'.json'`

#### echarts
- 全部引入、按需引入
- 设置主题色
- 使用 echarts-for-react 应用echarts

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
首先需要安装 less less-loader 配置对应的文件config/webpack.config.js,具体查看commit提交记录
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

 

### Depend

```
yarn add antd --save
yarn add moment --save
yarn add axios --save
yarn add echarts-for-react echarts --save
```

### Feature

该项目使用 Easy-mock 模拟前端数据，由于mock数据服务器不稳定，所以把请求内容存放在public/api/目录下，请求添加isMock来区分是否使用mock数据。如果不使用mock数据，请求本地数据，已经在request方法内增加优化 `options.isMock?options.url:options.url+'.json'`

#### echarts
- 全部引入、按需引入
- 设置主题色
- 使用 echarts-for-react 应用echarts
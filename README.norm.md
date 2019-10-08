提交规范 | [简体中文](./README.zh-CN.md) | [English](./README.md) 

### 代码提交规范

> 提交时，不允许 no verify
> 提交时的描述
> type: subject

```
<type>(<scope>) : <subject>

<空行>

<body>

<空行>

<footer>
```
- type 的值可以有很多，下面有几个我们常用到的
    - feat: 一个新功能
    - fix: 一个 bug 修复
    - docs: 仅仅修改了文档，比如 README, CHANGELOG, CONTRIBUTE 等
    - style: 不影响代码逻辑的修改，比如空格、格式缩进、删除分号等
    - refactor: 代码重构
    - perf: 提升性能的改动
    - test: 增加或修改测试
    - chore: 改变构建流程、或者增加辅助工具、依赖库等
    
- scope: 用来说明此次修改的影响范围 可以随便填写任何东西
    - all ：表示影响面大 ，如修改了网络框架  会对真个程序产生影响
    - loation： 表示影响小，某个小小的功能
    - module：表示会影响某个模块 如登录模块、首页模块 、用户管理模块等等
    
- subject: 用来简要描述本次改动，概述就好
- body: 具体的修改信息 应该尽量详细
- footer: 放置写备注的，如果是 bug ，可以把bug id放入

### emoji 使用指南

- git commit -m "`:tada:` Initialize Repo" :tada: 初次提交
- git commit -m "`:sparkles:` add register page" :sparkles: 引入新功能
- git commit -m "`:bug:` modify username error" :bug: 修复 bug
- git commit -m "`:lipstick:` modify login page style" :lipstick: 更新 UI 和样式文件
- git commit -m "`:memo:` add readme file" :memo: 撰写文档
- git commit -m "`:bookmark:` release v1.1.0" :bookmark: 发行/版本标签 
- git commit -m "`:globe_with_meridians:` release v1.1.0" :globe_with_meridians: 发行/版本标签 
- git commit -m "`:ambulance:` change login error" :ambulance: 重要补丁
- git commit -m "`:zap:` add dvajs" :zap: 提升性能
- git commit -m "`:art:` change directory structure" :art: 改进代码结构/代码格式
- git commit -m "`:wrench:` change directory structure" :wrench: 修改配置文件
- git commit -m "`:arrow_up:` up react version" :arrow_up: 升级依赖
- git commit -m "`:arrow_down:` down react version" :arrow_down: 降级依赖
    
## Git分支规范

- 分支
    - master分支为主分支(保护分支)，不能直接在master上进行修改代码和提交
    - develop分支为测试分支，所以开发完成需要提交测试的功能合并到该分支
    - feature分支为开发分支，大家根据不同需求创建独立的功能分支，开发完成后合并到develop分支，merge完成就可以删除
    - fix分支为bug修复分支，需要根据实际情况对已发布的版本进行漏洞修复，merge完成就可以删除


[详细规范](https://segmentfault.com/a/1190000016691552)、[图标地址](https://gitmoji.carloscuesta.me/)

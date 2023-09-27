# 个人博客项目

------

[TOC]

## 技术栈

- 基于react框架（Create-React-App）
- 使用TypeScript
- 使用scss
- 引入Ant Design
- 使用react-router
- 使用axios

## 启动项目

`cd my-app`  快速进入项目目录

`npm start`  启动项目

`npm run build` 快速打包项目

## 初始化项目

### 创建项目

`npm i -g create-react-app` 全局安装 `create-react-app`

`npx create-react-app my-app --template typescript` 创建基于TypeScript的react脚手架

ts配置

### Webpack配置

- 暴露Webpack
- 支持scss
- 设置路径别名
- 禁止build项目生成map文件

### 项目架构搭建

- 项目目录结构设计
- 关于样式命名规范
- 设置全局公共样式

### 引入Ant Design 5.x

- 安装Ant Design

## 项目介绍（页面路由（page组件名））

### index主页面（Myblog）

- Top
  - 搜索模块（模糊搜索title值，可以添加indexContent进行筛选）
  - 登录/个人中心（首页进入判断token有效性选择展示）
- Left
  - 打卡模块（登录后，可以记录签到日期，并且每日可以进行留言）
- Content
  - 左侧获取文章分类列表
  - 右侧展示选择分类对应的文章列表

### Text文章内容展示页面

- Top
  - 文章Title，分栏class，发表时间publish_time
- right
  - 文章评论区：在进入到text页面后，会同步判断token有效性，如果token有效role=0，评论为作者发表；token无效，role=1，评论为游客发表，头像从后台随机获取（token超时后，role未变化问题，可以设置定时发送更新role值）
- content
  - index-content模块展示文章的主要内容，md格式展示文章内容。

### Login管理员登录页面

- username 用户名
- password 密码

登录成功后，直接跳转到blog个人空间页面，保存用户token（10h localStorage）

登录失败，提示账号或密码错误

### 个人空间

- 文章管理部分

  - 已发布：显示所有已发布的文章（table），点击可以进入详情页进行相关修改/删除
  - 草稿：展示所有保存但未发布的文章草稿，点击可以进入详情页进行相关修改/删除
  - 新增文章：可以添加新的文章

  上述三个模块的文章修改页面都共用同一个组件

- class管理

  - 以tabel的形式展示所有的类别（分页）
  - 对class名称进行修改
  - 对class进行对应删除（删除后，该class下的所有文章将会变为未归档）
  - 添加新的class

- 个人信息

  - 修改头像，用户名，密码
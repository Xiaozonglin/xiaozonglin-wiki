---
title: 'XDSEC运维组2026第一次组会讲义'
date: 2026-10-26
authors: 林林
slug: /devops-group-meeting-one/
---

主要内容：

- 域名、服务器等基础设施
- HTTP协议，认证方式
- 前端、后端
- 留言板服务，AI编程

## 基础设施

域名，如`example.com`。域名解析，就是给域名添加一个记录，其中：

- A、AAAA，分别代表某个域名指向IPv4、IPv6地址
- CNAME，指定某个域名，该域名与其他域名的解析记录相同（CDN接入）
- TXT，指定某段文本（acme、spf、dmarc、dkim）
- MX，邮箱服务
- NS，Name Server，指定该域名的域名服务器
- 其他各种解析类型，例如地理位置等

服务器，高性能全天候运行的计算机。各位在实践、搭建博客的时候用云服务器或轻量应用服务器即可。

## HTTP协议与认证方式

HTTP抓包方法、发包方法

浏览器

认证方式，参见[谈谈认证](./2026-09-18-http-authentication.md)，只讲Basic Auth、Session Cookie和JWT。

## 前端与后端

- 前端：浏览器、用户交互、向后端请求数据
- 后端：处理请求，存储数据

不同的编程语言：

- 前端：JavaScript、TypeScript
- 后端：Node.js、PHP、Java、Golang……

## 设计留言板服务

参考文档：

- [Flask 模板渲染](https://www.runoob.com/flask/flask-templates.html)
- [Flask 表单处理](https://www.runoob.com/flask/flask-form.html)

用户身份：

- 管理员，需要登录，可以管理评论、回复评论
- 访客，不需要登录，可以发布评论

发布评论的过程：

1. 访客发布评论
2. 评论为待审核状态，仅管理员可见
3. 管理员可以通过或删除评论
4. 审核通过的评论公开显示

回复评论的过程：

1. 管理员回复评论
2. 回复直接显示

前端需要的接口（前后端分离的时候用）：

- 发布评论或回复评论
- 审核评论
- 管理员登录

考虑好需要用的接口后就可以设计接口文档了。
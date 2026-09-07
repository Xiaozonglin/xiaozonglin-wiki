---
id: 713
title: '西电信安协会招新系统 Golang 后端开发小记'
date: '2026-02-05T18:07:31+08:00'
authors: 林林
excerpt: '跟 CopperKoi 同学用 Vite + Golang 写了信安协会一个新的招新系统，在过程中遇到 gin 的一些坑。'
layout: post
guid: 'https://www.xiaozonglin.cn/?p=713'
slug: /xidian-cybersecurity-association-recruitment-system-golang-backend-development-notes/
ppma_authors_name:
    - 林林
categories:
    - 开发
tags:
    - Gin
    - Golang
    - Gorm
    - 后端
    - 开发
format: false
---

大概是，今年 1 月份与协会的 CopperKoi 同学把协会的招新系统重新做了一版。CopperKoi 用 Vite 写前端，他和我用 Golang 写后端。后端用 gin 处理请求，用 gorm 对接数据库。文章到这里就结束了。

<figure class="wp-block-image aligncenter size-large">![](/wp-content/uploads/2026/02/image-1024x554.png)<figcaption class="wp-element-caption">招新系统公测截图</figcaption></figure>接下来是废话时间。

CopperKoi 真的是一个很厉害的大佬。

<figure class="wp-block-image aligncenter size-large">![](/wp-content/uploads/2026/02/image-1-1024x274.png)<figcaption class="wp-element-caption">吹，接着吹</figcaption></figure>> 迎新页面（一般每年由大一同学建设）
> 
> <cite>引自某个文档</cite>

大概就是这样，今年我们在使用的招新系统有一些功能需要改进，但我找不到代码仓库，协会服务器里的站点文件夹里赫然堆着 Flask 大代码，明显不是今年用的这个。又听学长说历来都有大一新生写招新页面的传统，就来了。

CopperKoi 此前跟我聊过前端。当我问他愿不愿意带飞我做一个招新页面时，他欣然答应了。此前写过一些关于流程和数据库的设计图，CopperKoi 也写了接口文档，开整！

Golang 写完之后可以直接部署成二进制文件，这一点比 Python 方便许多。虽然能做到这一点的语言很多，Python 也有 Pyinstaller，不过没用过。

<figure class="wp-block-gallery aligncenter has-nested-images columns-default is-cropped"><figure class="wp-block-image size-large">![](/wp-content/uploads/2026/02/image-2-1024x518.png)<figcaption class="wp-element-caption">对面试者的面试流程</figcaption></figure><figure class="wp-block-image size-large">![](/wp-content/uploads/2026/02/1761997760-331194-image-1024x613.png)<figcaption class="wp-element-caption">对面试官的面试流程</figcaption></figure><figure class="wp-block-image size-large">![](/wp-content/uploads/2026/02/1761999701-2353-image-1024x599.png)<figcaption class="wp-element-caption">数据库模型</figcaption></figure><figcaption class="blocks-gallery-caption wp-element-caption">很古早的流程和数据库设计</figcaption></figure>我们在开发的过程中有一些迷，这里记录一下。

**前后端分离了怎么用 X-CSRF-Token 来防 csrf**：好像光想着要放 csrf 了，但我们不是前后端分离了吗？😅后来 CopperKoi 想到前端把 JWT 放在 Authorization Header 不依赖 Cookies 就可以让 csrf 几乎不可能实现。

腾讯的 CodeBuddy 写代码是真的快。我刚开始边翻文档边写代码速度好慢，把文档交给 ai 没过多久路由就都写好了。目前公测没有报告出 ai 代码的问题（只有我灵机一动犯的错）。但是 ai 写代码和我一样有时会出现想当然的错误。

<figure class="wp-block-image aligncenter size-full">![](/wp-content/uploads/2026/02/932fce25b0868b310e8e9b1004356931.png)<figcaption class="wp-element-caption">ai 的幻觉（幸好我略微熟悉代码）</figcaption></figure>**密码怎么传输？**我原本以为在后端 bcrypt 的基础上前端用 sha256 加密之后传输会安全一点，并且将这个设计补充到文档里。但当我问 Deepseek 时，它给出了不同的意见（[聊天链接](https://chat.deepseek.com/share/olhh5465joyqd6rbf8)）。“sha256 碰撞都来了。”CopperKoi 经过一番研究之后采用了 Deepseek 的建议，传输明文密码，传输过程中的安全由 https 来保障。

没过几天，CopperKoi 的前端也写好了。测试的时候公告的置顶接口出现了一个很奇妙的问题。

<figure class="wp-block-image aligncenter size-full">![](/wp-content/uploads/2026/02/image-3.png)<figcaption class="wp-element-caption">接口原本用来绑定 body 的模型</figcaption></figure>接口通过 Params 获取要置顶 / 取消置顶的公告的 uuid，通过 ShouldBindJSON 函数将 body 绑定到模型上。Pinned 布尔值为真则置顶公告，为假则取消置顶。

但是我在测试的时候发现：置顶公告的功能可以跑通，但取消置顶都会报告“参数校验失败”的错误。欸，明明 body 的结构符合要求啊。然后，就出现了惊天大瓜。

<figure class="wp-block-image aligncenter size-full">![](/wp-content/uploads/2026/02/2ac4b3ef5fa145807642b20bff3851bd.png)<figcaption class="wp-element-caption">看到这个回答我脑子都宕机了</figcaption></figure>六百六十六。我和 CopperKoi 都看呆了。当我们把这个发给[学长](https://www.woooo.tech/zh-cn/)时，他给我们分享了这个。

> When I send a JSON request with the value true it works, but when I send the same request with false I get the following error.
> 
> In summary you need a pointer or custom type to know if the value exists due to Go's static nature.
> 
> <cite>[Bool binding required Bug · Issue #814 · gin-gonic/gin](https://github.com/gin-gonic/gin/issues/814)</cite>

然后学长跟我们介绍了一件事情。

> 对于一些可以 nil 的字段而言，静态检查十分重要。GORM 的默认主键自增是从 0 开始的，不是从 1 开始，而你初始化系统用的第一个账户大概率是 admin 账户，账户 id 大概率也是 0。如果因为某些 bug，鉴权中间件没绑上 id……所有人都是 admin 了，而且 go 不会有任何错误汇报。

寄。但我们主键用 uuid 好像把这个坑绕过去了。（不然高低也要踩一回）

给 CopperKoi 提建议的时候我可得劲啦！我给 CopperKoi 提了：将性别从 input 改为单选框、textarea 没有限制宽度可以拉出容器边框、简历显示不出来等等…我们改、测得差不多之后就把代码部署上去让协会里的人公测。

在公测之前，我灵机一动：要不把里面能提的东西都提到 env 里面吧，把参数硬写在代码里不太优雅。然后我看到了 JWT 的 secret…让程序从 env 里面获取 secret。我真是个甜菜！（操作没错，但我的环境变量是用 .env 设置的）

<figure class="wp-block-image aligncenter size-full">![](/wp-content/uploads/2026/02/image-4.png)<figcaption class="wp-element-caption">想当然地让程序从 env 里获取密钥</figcaption></figure>在公测的那天晚上，服务就被学长攻破了。

<figure class="wp-block-image aligncenter size-full is-resized">![](/wp-content/uploads/2026/02/image-5.png)<figcaption class="wp-element-caption">学长通过修改 JWT 越权访问面试官才能访问的接口</figcaption></figure>学长通过 gpt 发现的。

> `jwtSecret =[]byte(os.Getenv("secretKey")`在包初始化阶段执行，而 env 是在 main.go 里`godotenv.Load()`才加载；结果 jwtSecret 可能为空字符串。攻击者可用空密钥自行签发 JWT，伪造 `role=interviewer` 直接接管所有受保护接口。
> 
> <cite>gpt如是说</cite>

把 secret 硬编码在代码里就把这个漏洞 fix 了。

[CopperKoi/XDSEC-Recruitment-System：协会2026招新系统前端](https://github.com/CopperKoi/XDSEC-Recruitment-System)  
[Xiaozonglin/xdsec-join-2026: 西电信安协会2026招新系统后端](https://github.com/Xiaozonglin/xdsec-join-2026)
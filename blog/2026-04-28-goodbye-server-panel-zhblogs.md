---
id: 1278
title: 再见面板：记zhblogs运维
date: '2026-04-28T23:30:37+08:00'
authors: 林林
excerpt: ''
layout: post
guid: 'https://www.xiaozonglin.cn/?p=1278'
slug: /goodbye-server-panel-zhblogs/
categories:
    - 技术与研究
tags:
    - zhblogs
    - 项目
format: false
---

之前沐云问我愿不愿意回到 zhblogs 参加维护，我回答如果参加的话希望可以负责一些运维有关的任务，于是在 zhblogs 新版本上线前夕，沐云问我愿不愿意部署新版本。

<figure class="wp-block-image aligncenter size-full is-resized">![](/wp-content/uploads/2026/04/image-3.png)<figcaption class="wp-element-caption">与沐云的聊天记录</figcaption></figure>整个任务大概是这样的：我先登上服务器把数据库备份下来，然后重装服务器系统，拉取代码，部署。过程中需要给项目整一个维护页面。

沐云vibe了一个维护页面，先是部署在我的服务器上，配置CDN那边花了一点时间，然后发现因为项目域名没有在阿里云接入备案所以被拦截了，于是沐云改用EdgeOne部署维护页面。在他用EdgeOne的时候，我收到了来自EdgeOne的邮件和短信，里面说EdgeOne支持部署Python Flask和Go的进行时了，沐云也为EdgeOne的升级感到惊喜，如果真是这样的话就连后端都不用部署在服务器上了。（ToDo++：重写一下自己的博客，并部署到EdgeOne上）

<figure class="wp-block-image aligncenter size-large is-resized">![](/wp-content/uploads/2026/04/image-4-1024x610.png)</figure>接着是登录服务器，这个费老大劲了。我先是用ssh-keygen生成密钥对，然后把公钥上传到腾讯云的密钥管理里面，绑定lighthouse，但怎么登都登不进去。后面用腾讯云生成的密钥对，绑定，也是怎么登都登不进去。沐云来远程也找不到哪里出了问题，后面只能曲线救国：用他的私钥登上去。等我登上去发现腾讯云压根没把我的公钥加到`~/.ssh/authorized_keys`，我手动加上去之后就可以用自己的私钥登录了。

然后找一找postgresql装在哪里，发现是用Docker装的，执行`sudo docker exec postgresql-17 pg_dump -U postgres -d zhblogs > /home/zhblogs/db_backup_$(date +%Y%m%d).sql`将需要备份的数据库dump出来，再通过scp命令下载到电脑本地。

<div class="wp-block-group"><figure class="wp-block-image aligncenter size-full is-resized">![](/wp-content/uploads/2026/04/image-8.png)</figure><figure class="wp-block-image aligncenter size-full is-resized">![](/wp-content/uploads/2026/04/image-5.png)</figure></div>大佬们好像都对服务器面板不感冒，甚至有点排斥。沐云要求我用纯命令行进行操作，这对我来说是一个机会。（ToDo++：宝塔面板把我的服务器弄得乱七八糟，重装系统自己用命令行把博客部署在一个“干净”的服务器上）

接下来是在不使用面板的情况下重装系统，并完成这些任务：

- 用户组配置
- docker，pg，nginx，fail2ban的安装和配置

沐云给出的用户组配置的方案是这样的：

- 创建一个www用户组
- 创建一个zhblogs用户，不可登录，位于www和sudo用户组
- 创建一个linlinzzo用户，位于www用户组
- linlinzzo用户在执行命令时可以用zhblogs的身份

于是，如果linlinzzo用户要使用root用户的权限执行命令，就需要先`sudo -u zhblogs`，再`sudo`。

<figure class="wp-block-image aligncenter size-large">![](/wp-content/uploads/2026/04/image-6-1024x137.png)<figcaption class="wp-element-caption">提权之路</figcaption></figure>关于用户组的配置，我是这么设置的（使用root用户执行）：

<div class="wp-block-kevinbatdorf-code-block-pro cbp-has-line-numbers" data-code-block-pro-font-family="Code-Pro-JetBrains-Mono" style="font-size:clamp(14px, .875rem, 21px);font-family:Code-Pro-JetBrains-Mono,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;--cbp-line-number-color:#000000;--cbp-line-number-width:calc(2 * 0.6 * .875rem);line-height:clamp(20px, 1.25rem, 30px);--cbp-tab-width:2;tab-size:var(--cbp-tab-width, 2)"><span style="display:flex;align-items:center;padding:10px 0px 0 16px;font-size:0.8em;width:100%;text-align:left;background-color:#FFFFFF;font-style:italic;color:#000000"><span style="border-bottom:1px solid rgba(0, 0, 0, 0.2)">Bash</span></span><span aria-label="复制" class="code-block-pro-copy-button" role="button" style="color:#000000;display:none" tabindex="0">```
<textarea aria-hidden="true" class="code-block-pro-copy-button-textarea" readonly="readonly" tabindex="-1">groupadd www
useradd -r -s /usr/sbin/nologin zhblogs
usermod -aG www zhblogs
usermod -aG sudo zhblogs

useradd linlinzzo
usermod -aG www linlinzzo

visudo
linlinzzo ALL=(zhblogs) NOPASSWD: ALL
zhblogs ALL=(ALL) NOPASSWD: ALL</textarea>
```

<svg fill="none" stroke="currentColor" stroke-width="2" style="width:24px;height:24px" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path class="with-check" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"></path><path class="without-check" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>```
<span class="line"><span style="color: #795E26">groupadd</span><span style="color: #000000"> </span><span style="color: #A31515">www</span></span>
<span class="line"><span style="color: #795E26">useradd</span><span style="color: #000000"> </span><span style="color: #0000FF">-r</span><span style="color: #000000"> </span><span style="color: #0000FF">-s</span><span style="color: #000000"> </span><span style="color: #A31515">/usr/sbin/nologin</span><span style="color: #000000"> </span><span style="color: #A31515">zhblogs</span></span>
<span class="line"><span style="color: #795E26">usermod</span><span style="color: #000000"> </span><span style="color: #0000FF">-aG</span><span style="color: #000000"> </span><span style="color: #A31515">www</span><span style="color: #000000"> </span><span style="color: #A31515">zhblogs</span></span>
<span class="line"><span style="color: #795E26">usermod</span><span style="color: #000000"> </span><span style="color: #0000FF">-aG</span><span style="color: #000000"> </span><span style="color: #A31515">sudo</span><span style="color: #000000"> </span><span style="color: #A31515">zhblogs</span></span>
<span class="line"></span>
<span class="line"><span style="color: #795E26">useradd</span><span style="color: #000000"> </span><span style="color: #A31515">linlinzzo</span></span>
<span class="line"><span style="color: #795E26">usermod</span><span style="color: #000000"> </span><span style="color: #0000FF">-aG</span><span style="color: #000000"> </span><span style="color: #A31515">www</span><span style="color: #000000"> </span><span style="color: #A31515">linlinzzo</span></span>
<span class="line"></span>
<span class="line"><span style="color: #795E26">visudo</span></span>
<span class="line"><span style="color: #795E26">linlinzzo</span><span style="color: #000000"> </span><span style="color: #A31515">ALL=</span><span style="color: #000000">(</span><span style="color: #A31515">zhblogs</span><span style="color: #000000">) NOPASSWD: ALL</span></span>
<span class="line"><span style="color: #795E26">zhblogs</span><span style="color: #000000"> </span><span style="color: #A31515">ALL=</span><span style="color: #000000">(</span><span style="color: #A31515">ALL</span><span style="color: #000000">) NOPASSWD: ALL</span></span>
```

</div>给这两个命令加个别名，不加的话打多了挺烦的。后面需要用root权限把sudo改成zhb-sudo就可以了。

<div class="wp-block-kevinbatdorf-code-block-pro cbp-has-line-numbers" data-code-block-pro-font-family="Code-Pro-JetBrains-Mono" style="font-size:clamp(14px, .875rem, 21px);font-family:Code-Pro-JetBrains-Mono,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;--cbp-line-number-color:#000000;--cbp-line-number-width:calc(1 * 0.6 * .875rem);line-height:clamp(20px, 1.25rem, 30px);--cbp-tab-width:2;tab-size:var(--cbp-tab-width, 2)"><span style="display:flex;align-items:center;padding:10px 0px 0 16px;font-size:0.8em;width:100%;text-align:left;background-color:#FFFFFF;font-style:italic;color:#000000"><span style="border-bottom:1px solid rgba(0, 0, 0, 0.2)">Bash</span></span><span aria-label="复制" class="code-block-pro-copy-button" role="button" style="color:#000000;display:none" tabindex="0">```
<textarea aria-hidden="true" class="code-block-pro-copy-button-textarea" readonly="readonly" tabindex="-1">cat >> ~/.bashrc << 'EOF'
alias zhb='sudo -u zhblogs'
alias zhb-sudo='sudo -u zhblogs sudo'
EOF

source ~/.bashrc</textarea>
```

<svg fill="none" stroke="currentColor" stroke-width="2" style="width:24px;height:24px" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path class="with-check" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"></path><path class="without-check" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>```
<span class="line"><span style="color: #795E26">cat</span><span style="color: #000000"> >> </span><span style="color: #A31515">~/.bashrc</span><span style="color: #000000"> << '</span><span style="color: #000000">EOF</span><span style="color: #000000">'</span></span>
<span class="line"><span style="color: #A31515">alias zhb='sudo -u zhblogs'</span></span>
<span class="line"><span style="color: #A31515">alias zhb-sudo='sudo -u zhblogs sudo'</span></span>
<span class="line"><span style="color: #000000">EOF</span></span>
<span class="line"></span>
<span class="line"><span style="color: #795E26">source</span><span style="color: #000000"> </span><span style="color: #A31515">~/.bashrc</span></span>
```

</div>接着就是按照官网的安装文档安装Docker，Postgresql和Valkey我是直接用apt安装的，其中Valkey被搜索到其实软件包叫valkey-server。

短暂的半天又不知道弄了什么。

<figure class="wp-block-image aligncenter size-full is-resized">![](/wp-content/uploads/2026/04/image-7.png)</figure>4 月 30 日，因为我的能力实在堪忧，这些任务重新由沐云来做。于是就有 [再见面板：Debian构建WordPress - 林林杂语](/build-wordpress-with-pure-commandline/) 这一篇的故事了。

**附录**

- [Linux scp 命令 | 菜鸟教程](https://www.runoob.com/linux/linux-comm-scp.html)
- [Linux 用户和用户组管理 | 菜鸟教程](https://www.runoob.com/linux/linux-user-manage.html)
- [Linux chown 命令 | 菜鸟教程](https://www.runoob.com/linux/linux-comm-chown.html)
- [Linux如何设置ssh密钥（免密码）登录 - 知乎](https://zhuanlan.zhihu.com/p/656414146)

- [PostgreSQL: Linux downloads (Debian)](https://www.postgresql.org/download/linux/debian/)
- [Debian下PostgreSQL的安装、配置、使用 - 知乎](https://zhuanlan.zhihu.com/p/667206246)
- [Install Docker Engine on Debian | Docker Docs](https://docs.docker.com/engine/install/debian/)
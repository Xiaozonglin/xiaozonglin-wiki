---
title: 再见面板：记zhblogs运维
date: 2026-04-28
authors: 林林
slug: /goodbye-server-panel-zhblogs/
---

之前沐云问我愿不愿意回到 zhblogs 参加维护，我回答如果参加的话希望可以负责一些运维有关的任务，于是在 zhblogs 新版本上线前夕，沐云问我愿不愿意部署新版本。

![](/wp-content/uploads/2026/04/image-3.png)

与沐云的聊天记录

整个任务大概是这样的：我先登上服务器把数据库备份下来，然后重装服务器系统，拉取代码，部署。过程中需要给项目整一个维护页面。

沐云vibe了一个维护页面，先是部署在我的服务器上，配置CDN那边花了一点时间，然后发现因为项目域名没有在阿里云接入备案所以被拦截了，于是沐云改用EdgeOne部署维护页面。在他用EdgeOne的时候，我收到了来自EdgeOne的邮件和短信，里面说EdgeOne支持部署Python Flask和Go的进行时了，沐云也为EdgeOne的升级感到惊喜，如果真是这样的话就连后端都不用部署在服务器上了。（ToDo++：重写一下自己的博客，并部署到EdgeOne上）

![](/wp-content/uploads/2026/04/image-4.png)

接着是登录服务器，这个费老大劲了。我先是用ssh-keygen生成密钥对，然后把公钥上传到腾讯云的密钥管理里面，绑定lighthouse，但怎么登都登不进去。后面用腾讯云生成的密钥对，绑定，也是怎么登都登不进去。沐云来远程也找不到哪里出了问题，后面只能曲线救国：用他的私钥登上去。等我登上去发现腾讯云压根没把我的公钥加到`~/.ssh/authorized_keys`，我手动加上去之后就可以用自己的私钥登录了。

然后找一找postgresql装在哪里，发现是用Docker装的，执行`sudo docker exec postgresql-17 pg_dump -U postgres -d zhblogs > /home/zhblogs/db_backup_$(date +%Y%m%d).sql`将需要备份的数据库dump出来，再通过scp命令下载到电脑本地。

![](/wp-content/uploads/2026/04/image-8.png)

![](/wp-content/uploads/2026/04/image-5.png)

大佬们好像都对服务器面板不感冒，甚至有点排斥。沐云要求我用纯命令行进行操作，这对我来说是一个机会。（ToDo++：宝塔面板把我的服务器弄得乱七八糟，重装系统自己用命令行把博客部署在一个“干净”的服务器上）

接下来是在不使用面板的情况下重装系统，并完成这些任务：

- 用户组配置
- docker，pg，nginx，fail2ban的安装和配置

沐云给出的用户组配置的方案是这样的：

- 创建一个www用户组
- 创建一个zhblogs用户，不可登录，位于www和sudo用户组
- 创建一个linlinzzo用户，位于www用户组
- linlinzzo用户在执行命令时可以用zhblogs的身份

于是，如果linlinzzo用户要使用root用户的权限执行命令，就需要先`sudo -u zhblogs`，再`sudo`。

![](/wp-content/uploads/2026/04/image-6.png)

提权之路

关于用户组的配置，我是这么设置的（使用root用户执行）：

```bash
groupadd www
useradd -r -s /usr/sbin/nologin zhblogs
usermod -aG www zhblogs
usermod -aG sudo zhblogs

useradd linlinzzo
usermod -aG www linlinzzo

visudo
linlinzzo ALL=(zhblogs) NOPASSWD: ALL
zhblogs ALL=(ALL) NOPASSWD: ALL
```

给这两个命令加个别名，不加的话打多了挺烦的。后面需要用root权限把sudo改成zhb-sudo就可以了。

```bash
cat >> ~/.bashrc << 'EOF'
alias zhb='sudo -u zhblogs'
alias zhb-sudo='sudo -u zhblogs sudo'
EOF

source ~/.bashrc
```

接着就是按照官网的安装文档安装Docker，Postgresql和Valkey我是直接用apt安装的，其中Valkey被搜索到其实软件包叫valkey-server。

短暂的半天又不知道弄了什么。

![](/wp-content/uploads/2026/04/image-7.png)

4 月 30 日，因为我的能力实在堪忧，这些任务重新由沐云来做。于是就有 [再见面板：Debian构建WordPress - 林林杂语](/build-wordpress-with-pure-commandline/) 这一篇的故事了。

**附录**

- [Linux scp 命令 | 菜鸟教程](https://www.runoob.com/linux/linux-comm-scp.html)
- [Linux 用户和用户组管理 | 菜鸟教程](https://www.runoob.com/linux/linux-user-manage.html)
- [Linux chown 命令 | 菜鸟教程](https://www.runoob.com/linux/linux-comm-chown.html)
- [Linux如何设置ssh密钥（免密码）登录 - 知乎](https://zhuanlan.zhihu.com/p/656414146)

- [PostgreSQL: Linux downloads (Debian)](https://www.postgresql.org/download/linux/debian/)
- [Debian下PostgreSQL的安装、配置、使用 - 知乎](https://zhuanlan.zhihu.com/p/667206246)
- [Install Docker Engine on Debian | Docker Docs](https://docs.docker.com/engine/install/debian/)
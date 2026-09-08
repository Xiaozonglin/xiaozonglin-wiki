---
id: 948
title: 新年新气象：网站快一点，再快一点
date: '2026-02-16T12:28:02+08:00'
authors: 林林
excerpt: 新年新气象，进行了一次网站性能优化，这次没有依赖堆积如山的WordPress插件。
layout: post
guid: 'https://www.xiaozonglin.cn/?p=948'
slug: /be-faster-even-faster/
ppma_authors_name:
    - 林林
categories:
    - 技术与研究
tags:
    - wordpress
format: false
---

WordPress 如果没有缓存，就会加载得超级慢。此前，我在网站上装了 Jetpack Boost、WP Super Cache 等插件。昨晚看到 [此前发的文章](/wordpress-optimization/)，发现还能装一个 Redis Object Cache。

插件装得越来越多，我问 ChatGPT 有没有必要装这么多插件，它向我推荐了一种方案。如今，网站的访问速度基本得到了改善。秒开估计还是有些困难。

![](/wp-content/uploads/2026/02/image-15-1024x601.png)

测速全绿（全部深绿还有点难）

## Fastcgi Cache

WordPress 上的缓存插件都是在 PHP 运行的过程中起作用的，Fastcgi 缓存可以将服务器的缓存前置到 Nginx，如果 Nginx 匹配到缓存文件直接返回，请求不会给到 PHP。

在站点的 Nginx 配置文件伪静态部分后面加上如下片段，其中加粗部分为缓存的有效时间。

```conf
set $skip_cache 0;
if ($request_method = POST) { set $skip_cache 1; }
if ($http_cookie ~* "wordpress_logged_in_") { set $skip_cache 1; }
if ($request_uri ~* "/wp-admin/|/wp-login.php|/xmlrpc.php") { set $skip_cache 1; }
if ($args != "") { set $skip_cache 1; }

location ~ \.php$ {
    include fastcgi_params;
    fastcgi_pass unix:/tmp/php-cgi-85.sock;
    fastcgi_index index.php;
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;

    fastcgi_cache WORDPRESS;
    fastcgi_cache_key "$scheme$request_method$host$request_uri";
    fastcgi_cache_valid 200 301 302 30m;
    fastcgi_cache_valid 404 1m;
    fastcgi_cache_bypass $skip_cache;
    fastcgi_no_cache $skip_cache;

    add_header X-Cache $upstream_cache_status;
}
```

在 Nginx 的全局配置文件中加上如下片段。

```conf
fastcgi_cache_path /www/wwwroot/fastcgi_cache levels=1:2 keys_zone=WORDPRESS:100m inactive=60m;
fastcgi_cache_key "$scheme$request_method$host$request_uri";
```

## Gzip 和 Brotli 压缩

知道创宇的加速乐本就有 Gzip 自动压缩的功能，默认开启且无法关闭。皓子的 [静态资源预压缩：零运行时开销，极致节省带宽](https://howiehz.top/archives/static-resource-precompression) 这篇文章给我提供了一种可能的优化路径。因为原先安装的 Nginx 并没有带 Brotli 模块，所以我卸载掉重新编译安装了一个。

然后 apt 安装 Brotli，在网站目录里搜索 js、css 文件并生成其对应的 gz、br 文件。

![](/wp-content/uploads/2026/02/image-16.png)

随后，在 Nginx 站点配置文件中添加关于 Gzip 和 Brotli 压缩的设置。

```conf
brotli on; brotli_static on; brotli_comp_level 5;
brotli_types text/plain text/css application/javascript application/json application/xml text/html image/svg+xml;

gzip on; gzip_static on; gzip_vary on; gzip_comp_level 5;
gzip_types text/plain text/css application/javascript application/json application/xml text/html image/svg+xml;
```

但可能是因为 CDN，我并没能测试到服务器返回 br encoded 的内容。

## WordPress的插件

弄好上面的缓存和压缩之后，把 WP Super Cache 插件移除掉网站访问起来也不会太卡。目前网站正在用这些优化速度的插件：

| 插件名 | 用途 |
|---|---|
| Advanced Database Cleaner | 清理修订版本等垃圾数据 |
| CompressX | 提供图片的webp和avif版本 |
| Redis Object Cache | 网站目前使用的唯一缓存插件 |

2026.4.28更新：CompressX压缩图片之后使用WordPress自带的图片灯箱功能会出现异常，放大的图标能显示出来，但放大不了。Fastcgi在一些情况下会出现异常缓存，而且用宝塔服务器面板的环境下改Nginx配置文件会改乱，这可能是我个人能力的问题。
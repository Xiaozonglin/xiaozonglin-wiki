---
id: 1296
title: 再见面板：Debian构建WordPress
date: '2026-04-30T23:42:30+08:00'
author: 林林
excerpt: ''
layout: post
guid: 'https://www.xiaozonglin.cn/?p=1296'
permalink: /build-wordpress-with-pure-commandline/
categories:
    - 技术与研究
tags:
    - 运维
format: false
---

任务要求：使用Debian纯命令行构建自己的WordPress网站，并通过一些方法支持`http://linlin.zzo`访问。

<div class="wp-block-kevinbatdorf-code-block-pro cbp-has-line-numbers" data-code-block-pro-font-family="Code-Pro-JetBrains-Mono" style="font-size:clamp(14px, .875rem, 21px);font-family:Code-Pro-JetBrains-Mono,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;--cbp-line-number-color:#000000;--cbp-line-number-width:calc(2 * 0.6 * .875rem);line-height:clamp(20px, 1.25rem, 30px);--cbp-tab-width:2;tab-size:var(--cbp-tab-width, 2)"><span style="display:flex;align-items:center;padding:10px 0px 0 16px;font-size:0.8em;width:100%;text-align:left;background-color:#FFFFFF;font-style:italic;color:#000000"><span style="border-bottom:1px solid rgba(0, 0, 0, 0.2)">Bash</span></span><span aria-label="复制" class="code-block-pro-copy-button" role="button" style="color:#000000;display:none" tabindex="0">```
<textarea aria-hidden="true" class="code-block-pro-copy-button-textarea" readonly="readonly" tabindex="-1">linlinzzo@linlinzzo:~$ cat /etc/os-release
PRETTY_NAME="Debian GNU/Linux 13 (trixie)"
NAME="Debian GNU/Linux"
VERSION_ID="13"
VERSION="13 (trixie)"
VERSION_CODENAME=trixie
DEBIAN_VERSION_FULL=13.4
ID=debian
HOME_URL="https://www.debian.org/"
SUPPORT_URL="https://www.debian.org/support"
BUG_REPORT_URL="https://bugs.debian.org/"</textarea>
```

<svg fill="none" stroke="currentColor" stroke-width="2" style="width:24px;height:24px" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path class="with-check" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"></path><path class="without-check" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>```
<span class="line"><span style="color: #795E26">linlinzzo@linlinzzo:~$</span><span style="color: #000000"> </span><span style="color: #A31515">cat</span><span style="color: #000000"> </span><span style="color: #A31515">/etc/os-release</span></span>
<span class="line"><span style="color: #001080">PRETTY_NAME</span><span style="color: #000000">=</span><span style="color: #A31515">"Debian GNU/Linux 13 (trixie)"</span></span>
<span class="line"><span style="color: #001080">NAME</span><span style="color: #000000">=</span><span style="color: #A31515">"Debian GNU/Linux"</span></span>
<span class="line"><span style="color: #001080">VERSION_ID</span><span style="color: #000000">=</span><span style="color: #A31515">"13"</span></span>
<span class="line"><span style="color: #001080">VERSION</span><span style="color: #000000">=</span><span style="color: #A31515">"13 (trixie)"</span></span>
<span class="line"><span style="color: #001080">VERSION_CODENAME</span><span style="color: #000000">=</span><span style="color: #A31515">trixie</span></span>
<span class="line"><span style="color: #001080">DEBIAN_VERSION_FULL</span><span style="color: #000000">=</span><span style="color: #098658">13.4</span></span>
<span class="line"><span style="color: #001080">ID</span><span style="color: #000000">=</span><span style="color: #A31515">debian</span></span>
<span class="line"><span style="color: #001080">HOME_URL</span><span style="color: #000000">=</span><span style="color: #A31515">"https://www.debian.org/"</span></span>
<span class="line"><span style="color: #001080">SUPPORT_URL</span><span style="color: #000000">=</span><span style="color: #A31515">"https://www.debian.org/support"</span></span>
<span class="line"><span style="color: #001080">BUG_REPORT_URL</span><span style="color: #000000">=</span><span style="color: #A31515">"https://bugs.debian.org/"</span></span>
```

</div>安装所需要的应用

<div class="wp-block-kevinbatdorf-code-block-pro cbp-has-line-numbers" data-code-block-pro-font-family="Code-Pro-JetBrains-Mono" style="font-size:clamp(14px, .875rem, 21px);font-family:Code-Pro-JetBrains-Mono,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;--cbp-line-number-color:#000000;--cbp-line-number-width:calc(1 * 0.6 * .875rem);line-height:clamp(20px, 1.25rem, 30px);--cbp-tab-width:2;tab-size:var(--cbp-tab-width, 2)"><span style="display:flex;align-items:center;padding:10px 0px 0 16px;font-size:0.8em;width:100%;text-align:left;background-color:#FFFFFF;font-style:italic;color:#000000"><span style="border-bottom:1px solid rgba(0, 0, 0, 0.2)">Bash</span></span><span aria-label="复制" class="code-block-pro-copy-button" role="button" style="color:#000000;display:none" tabindex="0">```
<textarea aria-hidden="true" class="code-block-pro-copy-button-textarea" readonly="readonly" tabindex="-1">sudo apt install -y php-fpm # PHP
sudo apt install nginx</textarea>
```

<svg fill="none" stroke="currentColor" stroke-width="2" style="width:24px;height:24px" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path class="with-check" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"></path><path class="without-check" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>```
<span class="line"><span style="color: #795E26">sudo</span><span style="color: #000000"> </span><span style="color: #A31515">apt</span><span style="color: #000000"> </span><span style="color: #A31515">install</span><span style="color: #000000"> </span><span style="color: #0000FF">-y</span><span style="color: #000000"> </span><span style="color: #A31515">php-fpm</span><span style="color: #000000"> </span><span style="color: #008000"># PHP</span></span>
<span class="line"><span style="color: #795E26">sudo</span><span style="color: #000000"> </span><span style="color: #A31515">apt</span><span style="color: #000000"> </span><span style="color: #A31515">install</span><span style="color: #000000"> </span><span style="color: #A31515">nginx</span></span>
```

</div>安装 nginx 的时候报错`Not attempting to start NGINX, port 80 is already in use.`，当我通过[Linux 查看端口占用情况 | 菜鸟教程](https://www.runoob.com/w3cnote/linux-check-port-usage.html)的方法去检查端口占用的时候发现lsof和netstat命令都不存在，用apt把lsof安装一下。发现是apache把80端口给占了。

<div class="wp-block-kevinbatdorf-code-block-pro cbp-has-line-numbers" data-code-block-pro-font-family="Code-Pro-JetBrains-Mono" style="font-size:clamp(14px, .875rem, 21px);font-family:Code-Pro-JetBrains-Mono,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;--cbp-line-number-color:#000000;--cbp-line-number-width:calc(1 * 0.6 * .875rem);line-height:clamp(20px, 1.25rem, 30px);--cbp-tab-width:2;tab-size:var(--cbp-tab-width, 2)"><span style="display:flex;align-items:center;padding:10px 0px 0 16px;font-size:0.8em;width:100%;text-align:left;background-color:#FFFFFF;font-style:italic;color:#000000"><span style="border-bottom:1px solid rgba(0, 0, 0, 0.2)">Bash</span></span><span aria-label="复制" class="code-block-pro-copy-button" role="button" style="color:#000000;display:none" tabindex="0">```
<textarea aria-hidden="true" class="code-block-pro-copy-button-textarea" readonly="readonly" tabindex="-1">linlinzzo@linlinzzo:~$ sudo lsof -i:80
COMMAND  PID     USER FD   TYPE DEVICE SIZE/OFF NODE NAME
apache2 9027     root 4u  IPv6  35905      0t0  TCP *:http (LISTEN)
apache2 9030 www-data 4u  IPv6  35905      0t0  TCP *:http (LISTEN)
apache2 9031 www-data 4u  IPv6  35905      0t0  TCP *:http (LISTEN)
apache2 9032 www-data 4u  IPv6  35905      0t0  TCP *:http (LISTEN)
apache2 9033 www-data 4u  IPv6  35905      0t0  TCP *:http (LISTEN)
apache2 9034 www-data 4u  IPv6  35905      0t0  TCP *:http (LISTEN)</textarea>
```

<svg fill="none" stroke="currentColor" stroke-width="2" style="width:24px;height:24px" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path class="with-check" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"></path><path class="without-check" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>```
<span class="line"><span style="color: #795E26">linlinzzo@linlinzzo:~$</span><span style="color: #000000"> </span><span style="color: #A31515">sudo</span><span style="color: #000000"> </span><span style="color: #A31515">lsof</span><span style="color: #000000"> </span><span style="color: #0000FF">-i:80</span></span>
<span class="line"><span style="color: #795E26">COMMAND</span><span style="color: #000000">  </span><span style="color: #A31515">PID</span><span style="color: #000000">     </span><span style="color: #A31515">USER</span><span style="color: #000000"> </span><span style="color: #A31515">FD</span><span style="color: #000000">   </span><span style="color: #A31515">TYPE</span><span style="color: #000000"> </span><span style="color: #A31515">DEVICE</span><span style="color: #000000"> </span><span style="color: #A31515">SIZE/OFF</span><span style="color: #000000"> </span><span style="color: #A31515">NODE</span><span style="color: #000000"> </span><span style="color: #A31515">NAME</span></span>
<span class="line"><span style="color: #795E26">apache2</span><span style="color: #000000"> </span><span style="color: #098658">9027</span><span style="color: #000000">     </span><span style="color: #A31515">root</span><span style="color: #000000"> </span><span style="color: #098658">4</span><span style="color: #A31515">u</span><span style="color: #000000">  </span><span style="color: #A31515">IPv6</span><span style="color: #000000">  </span><span style="color: #098658">35905</span><span style="color: #000000">      </span><span style="color: #098658">0</span><span style="color: #A31515">t0</span><span style="color: #000000">  </span><span style="color: #A31515">TCP</span><span style="color: #000000"> </span><span style="color: #0000FF">*</span><span style="color: #A31515">:http</span><span style="color: #000000"> (LISTEN)</span></span>
<span class="line"><span style="color: #795E26">apache2</span><span style="color: #000000"> </span><span style="color: #098658">9030</span><span style="color: #000000"> </span><span style="color: #A31515">www-data</span><span style="color: #000000"> </span><span style="color: #098658">4</span><span style="color: #A31515">u</span><span style="color: #000000">  </span><span style="color: #A31515">IPv6</span><span style="color: #000000">  </span><span style="color: #098658">35905</span><span style="color: #000000">      </span><span style="color: #098658">0</span><span style="color: #A31515">t0</span><span style="color: #000000">  </span><span style="color: #A31515">TCP</span><span style="color: #000000"> </span><span style="color: #0000FF">*</span><span style="color: #A31515">:http</span><span style="color: #000000"> (LISTEN)</span></span>
<span class="line"><span style="color: #795E26">apache2</span><span style="color: #000000"> </span><span style="color: #098658">9031</span><span style="color: #000000"> </span><span style="color: #A31515">www-data</span><span style="color: #000000"> </span><span style="color: #098658">4</span><span style="color: #A31515">u</span><span style="color: #000000">  </span><span style="color: #A31515">IPv6</span><span style="color: #000000">  </span><span style="color: #098658">35905</span><span style="color: #000000">      </span><span style="color: #098658">0</span><span style="color: #A31515">t0</span><span style="color: #000000">  </span><span style="color: #A31515">TCP</span><span style="color: #000000"> </span><span style="color: #0000FF">*</span><span style="color: #A31515">:http</span><span style="color: #000000"> (LISTEN)</span></span>
<span class="line"><span style="color: #795E26">apache2</span><span style="color: #000000"> </span><span style="color: #098658">9032</span><span style="color: #000000"> </span><span style="color: #A31515">www-data</span><span style="color: #000000"> </span><span style="color: #098658">4</span><span style="color: #A31515">u</span><span style="color: #000000">  </span><span style="color: #A31515">IPv6</span><span style="color: #000000">  </span><span style="color: #098658">35905</span><span style="color: #000000">      </span><span style="color: #098658">0</span><span style="color: #A31515">t0</span><span style="color: #000000">  </span><span style="color: #A31515">TCP</span><span style="color: #000000"> </span><span style="color: #0000FF">*</span><span style="color: #A31515">:http</span><span style="color: #000000"> (LISTEN)</span></span>
<span class="line"><span style="color: #795E26">apache2</span><span style="color: #000000"> </span><span style="color: #098658">9033</span><span style="color: #000000"> </span><span style="color: #A31515">www-data</span><span style="color: #000000"> </span><span style="color: #098658">4</span><span style="color: #A31515">u</span><span style="color: #000000">  </span><span style="color: #A31515">IPv6</span><span style="color: #000000">  </span><span style="color: #098658">35905</span><span style="color: #000000">      </span><span style="color: #098658">0</span><span style="color: #A31515">t0</span><span style="color: #000000">  </span><span style="color: #A31515">TCP</span><span style="color: #000000"> </span><span style="color: #0000FF">*</span><span style="color: #A31515">:http</span><span style="color: #000000"> (LISTEN)</span></span>
<span class="line"><span style="color: #795E26">apache2</span><span style="color: #000000"> </span><span style="color: #098658">9034</span><span style="color: #000000"> </span><span style="color: #A31515">www-data</span><span style="color: #000000"> </span><span style="color: #098658">4</span><span style="color: #A31515">u</span><span style="color: #000000">  </span><span style="color: #A31515">IPv6</span><span style="color: #000000">  </span><span style="color: #098658">35905</span><span style="color: #000000">      </span><span style="color: #098658">0</span><span style="color: #A31515">t0</span><span style="color: #000000">  </span><span style="color: #A31515">TCP</span><span style="color: #000000"> </span><span style="color: #0000FF">*</span><span style="color: #A31515">:http</span><span style="color: #000000"> (LISTEN)</span></span>
```

</div>把apache卸载之后就可以用systemctl启动nginx了。

正要打算从官网下载MySQL，结果发现wget没装，把wget装一下，然后安装MySQL。

<div class="wp-block-kevinbatdorf-code-block-pro cbp-has-line-numbers" data-code-block-pro-font-family="Code-Pro-JetBrains-Mono" style="font-size:clamp(14px, .875rem, 21px);font-family:Code-Pro-JetBrains-Mono,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;--cbp-line-number-color:#000000;--cbp-line-number-width:calc(1 * 0.6 * .875rem);line-height:clamp(20px, 1.25rem, 30px);--cbp-tab-width:2;tab-size:var(--cbp-tab-width, 2)"><span style="display:flex;align-items:center;padding:10px 0px 0 16px;font-size:0.8em;width:100%;text-align:left;background-color:#FFFFFF;font-style:italic;color:#000000"><span style="border-bottom:1px solid rgba(0, 0, 0, 0.2)">SQL</span></span><span aria-label="复制" class="code-block-pro-copy-button" role="button" style="color:#000000;display:none" tabindex="0">```
<textarea aria-hidden="true" class="code-block-pro-copy-button-textarea" readonly="readonly" tabindex="-1">CREATE USER '111'@'localhost' IDENTIFIED BY '111';
CREATE DATABASE lin;
GRANT ALL PRIVILEGES ON lin.* TO '111'@'localhost';</textarea>
```

<svg fill="none" stroke="currentColor" stroke-width="2" style="width:24px;height:24px" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path class="with-check" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"></path><path class="without-check" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>```
<span class="line"><span style="color: #0000FF">CREATE</span><span style="color: #000000"> </span><span style="color: #0000FF">USER</span><span style="color: #000000"> '</span><span style="color: #795E26">111</span><span style="color: #000000">'@</span><span style="color: #A31515">'localhost'</span><span style="color: #000000"> IDENTIFIED </span><span style="color: #0000FF">BY</span><span style="color: #000000"> </span><span style="color: #A31515">'111'</span><span style="color: #000000">;</span></span>
<span class="line"><span style="color: #0000FF">CREATE</span><span style="color: #000000"> </span><span style="color: #0000FF">DATABASE</span><span style="color: #000000"> </span><span style="color: #795E26">lin</span><span style="color: #000000">;</span></span>
<span class="line"><span style="color: #0000FF">GRANT</span><span style="color: #000000"> ALL PRIVILEGES </span><span style="color: #0000FF">ON</span><span style="color: #000000"> lin.* </span><span style="color: #0000FF">TO</span><span style="color: #000000"> </span><span style="color: #A31515">'111'</span><span style="color: #000000">@</span><span style="color: #A31515">'localhost'</span><span style="color: #000000">;</span></span>
```

</div>用`ip addr`看虚拟环境的IP，通过设置hosts文件让`linlin.zzo`指向虚拟环境。因为Nginx的配置文件是照搬网上的，一开始看日志是root设置错了还没有设置好访问权限，改好后还是报错，发现是php-fpm的路径不对。用where命令找不到php-fpm。通过下面的方法找到.sock的地址。

<div class="wp-block-kevinbatdorf-code-block-pro cbp-has-line-numbers" data-code-block-pro-font-family="Code-Pro-JetBrains-Mono" style="font-size:clamp(14px, .875rem, 21px);font-family:Code-Pro-JetBrains-Mono,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;--cbp-line-number-color:#000000;--cbp-line-number-width:calc(2 * 0.6 * .875rem);line-height:clamp(20px, 1.25rem, 30px);--cbp-tab-width:2;tab-size:var(--cbp-tab-width, 2)"><span style="display:flex;align-items:center;padding:10px 0px 0 16px;font-size:0.8em;width:100%;text-align:left;background-color:#FFFFFF;font-style:italic;color:#000000"><span style="border-bottom:1px solid rgba(0, 0, 0, 0.2)">Bash</span></span><span aria-label="复制" class="code-block-pro-copy-button" role="button" style="color:#000000;display:none" tabindex="0">```
<textarea aria-hidden="true" class="code-block-pro-copy-button-textarea" readonly="readonly" tabindex="-1">linlinzzo@linlinzzo:/etc/nginx/conf.d$ sudo systemctl status php8.4-fpm
● php8.4-fpm.service - The PHP 8.4 FastCGI Process Manager
     Loaded: loaded (/usr/lib/systemd/system/php8.4-fpm.service; enabled; preset: enabled)
(...)
linlinzzo@linlinzzo:/etc/nginx/conf.d$ cat /usr/lib/systemd/system/php8.4-fpm.service
(...)
[Service]
Type=notify
ExecStart=/usr/sbin/php-fpm8.4 --nodaemonize --fpm-config /etc/php/8.4/fpm/php-fpm.conf
ExecStartPost=-/usr/lib/php/php-fpm-socket-helper install /run/php/php-fpm.sock /etc/php/8.4/fpm/pool.d/www.conf 84
ExecStopPost=-/usr/lib/php/php-fpm-socket-helper remove /run/php/php-fpm.sock /etc/php/8.4/fpm/pool.d/www.conf 84
(...)</textarea>
```

<svg fill="none" stroke="currentColor" stroke-width="2" style="width:24px;height:24px" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path class="with-check" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"></path><path class="without-check" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>```
<span class="line"><span style="color: #795E26">linlinzzo@linlinzzo:/etc/nginx/conf.d$</span><span style="color: #000000"> </span><span style="color: #A31515">sudo</span><span style="color: #000000"> </span><span style="color: #A31515">systemctl</span><span style="color: #000000"> </span><span style="color: #A31515">status</span><span style="color: #000000"> </span><span style="color: #A31515">php8.4-fpm</span></span>
<span class="line"><span style="color: #795E26">●</span><span style="color: #000000"> </span><span style="color: #A31515">php8.4-fpm.service</span><span style="color: #000000"> </span><span style="color: #A31515">-</span><span style="color: #000000"> </span><span style="color: #A31515">The</span><span style="color: #000000"> </span><span style="color: #A31515">PHP</span><span style="color: #000000"> </span><span style="color: #098658">8.4</span><span style="color: #000000"> </span><span style="color: #A31515">FastCGI</span><span style="color: #000000"> </span><span style="color: #A31515">Process</span><span style="color: #000000"> </span><span style="color: #A31515">Manager</span></span>
<span class="line"><span style="color: #000000">     </span><span style="color: #795E26">Loaded:</span><span style="color: #000000"> </span><span style="color: #A31515">loaded</span><span style="color: #000000"> (/usr/lib/systemd/system/php8.4-fpm.service; </span><span style="color: #795E26">enabled</span><span style="color: #000000">; </span><span style="color: #795E26">preset:</span><span style="color: #000000"> </span><span style="color: #A31515">enabled</span><span style="color: #000000">)</span></span>
<span class="line"><span style="color: #000000">(</span><span style="color: #795E26">...</span><span style="color: #000000">)</span></span>
<span class="line"><span style="color: #795E26">linlinzzo@linlinzzo:/etc/nginx/conf.d$</span><span style="color: #000000"> </span><span style="color: #A31515">cat</span><span style="color: #000000"> </span><span style="color: #A31515">/usr/lib/systemd/system/php8.4-fpm.service</span></span>
<span class="line"><span style="color: #000000">(</span><span style="color: #795E26">...</span><span style="color: #000000">)</span></span>
<span class="line"><span style="color: #000000">[Service]</span></span>
<span class="line"><span style="color: #001080">Type</span><span style="color: #000000">=</span><span style="color: #A31515">notify</span></span>
<span class="line"><span style="color: #001080">ExecStart</span><span style="color: #000000">=</span><span style="color: #A31515">/usr/sbin/php-fpm8.4</span><span style="color: #000000"> </span><span style="color: #795E26">--nodaemonize</span><span style="color: #000000"> </span><span style="color: #0000FF">--fpm-config</span><span style="color: #000000"> </span><span style="color: #A31515">/etc/php/8.4/fpm/php-fpm.conf</span></span>
<span class="line"><span style="color: #001080">ExecStartPost</span><span style="color: #000000">=</span><span style="color: #A31515">-/usr/lib/php/php-fpm-socket-helper</span><span style="color: #000000"> </span><span style="color: #795E26">install</span><span style="color: #000000"> </span><span style="color: #A31515">/run/php/php-fpm.sock</span><span style="color: #000000"> </span><span style="color: #A31515">/etc/php/8.4/fpm/pool.d/www.conf</span><span style="color: #000000"> </span><span style="color: #098658">84</span></span>
<span class="line"><span style="color: #001080">ExecStopPost</span><span style="color: #000000">=</span><span style="color: #A31515">-/usr/lib/php/php-fpm-socket-helper</span><span style="color: #000000"> </span><span style="color: #795E26">remove</span><span style="color: #000000"> </span><span style="color: #A31515">/run/php/php-fpm.sock</span><span style="color: #000000"> </span><span style="color: #A31515">/etc/php/8.4/fpm/pool.d/www.conf</span><span style="color: #000000"> </span><span style="color: #098658">84</span></span>
<span class="line"><span style="color: #000000">(</span><span style="color: #795E26">...</span><span style="color: #000000">)</span></span>
```

</div><figure class="wp-block-image aligncenter size-large">![](/wp-content/uploads/2026/04/image-9-1024x273.png)</figure>这下可以显示出页面了，提示说需要安装一个PHP拓展，那我们安装一下。

<div class="wp-block-kevinbatdorf-code-block-pro cbp-has-line-numbers" data-code-block-pro-font-family="Code-Pro-JetBrains-Mono" style="font-size:clamp(14px, .875rem, 21px);font-family:Code-Pro-JetBrains-Mono,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;--cbp-line-number-color:#000000;--cbp-line-number-width:calc(1 * 0.6 * .875rem);line-height:clamp(20px, 1.25rem, 30px);--cbp-tab-width:2;tab-size:var(--cbp-tab-width, 2)"><span style="display:flex;align-items:center;padding:10px 0px 0 16px;font-size:0.8em;width:100%;text-align:left;background-color:#FFFFFF;font-style:italic;color:#000000"><span style="border-bottom:1px solid rgba(0, 0, 0, 0.2)">Bash</span></span><span aria-label="复制" class="code-block-pro-copy-button" role="button" style="color:#000000;display:none" tabindex="0">```
<textarea aria-hidden="true" class="code-block-pro-copy-button-textarea" readonly="readonly" tabindex="-1">linlinzzo@linlinzzo:/etc/nginx/conf.d$ sudo apt install php-mysqli
Note, selecting 'php8.4-mysql' instead of 'php-mysqli'
...</textarea>
```

<svg fill="none" stroke="currentColor" stroke-width="2" style="width:24px;height:24px" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path class="with-check" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"></path><path class="without-check" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>```
<span class="line"><span style="color: #795E26">linlinzzo@linlinzzo:/etc/nginx/conf.d$</span><span style="color: #000000"> </span><span style="color: #A31515">sudo</span><span style="color: #000000"> </span><span style="color: #A31515">apt</span><span style="color: #000000"> </span><span style="color: #A31515">install</span><span style="color: #000000"> </span><span style="color: #A31515">php-mysqli</span></span>
<span class="line"><span style="color: #795E26">Note,</span><span style="color: #000000"> </span><span style="color: #A31515">selecting</span><span style="color: #000000"> </span><span style="color: #A31515">'php8.4-mysql'</span><span style="color: #000000"> </span><span style="color: #A31515">instead</span><span style="color: #000000"> </span><span style="color: #A31515">of</span><span style="color: #000000"> </span><span style="color: #A31515">'php-mysqli'</span></span>
<span class="line"><span style="color: #795E26">...</span></span>
```

</div>安装好之后回到刚才的安装界面设置管理账户的用户名和密码，接下来通过WordPress自带的迁移功能进行迁移。

WordPress无论是自己上传插件文件还是从插件市场上安装都需要配置FTP信息，奇怪，为什么我在我服务器上不用这些信息。我不太想配置FTP，所以直接在Windows把压缩包传到Debian然后解压。

当我启用导入插件并将我这个博客的导出文件传进去时，发生了**413 Request Entity Too Large**。我在Nginx的配置文件中加了一行放宽一下限制：`client_max_body_size 100M;`。

这样大致就OK了。

<figure class="wp-block-image aligncenter size-large">![](/wp-content/uploads/2026/04/image-10-1024x582.png)</figure><figure class="wp-block-image aligncenter size-full is-resized">![](/wp-content/uploads/2026/04/image-11.png)<figcaption class="wp-element-caption">未完待续</figcaption></figure>用VirtualBox安装虚拟机之后，使用普通用户登录发现没有sudo权限，改成root身份，后面配置就不用敲sudo了。

<div class="wp-block-group">**附录**

- [在Ubuntu中安装Deb包的3个命令行工具 - 知乎](https://zhuanlan.zhihu.com/p/638649740)
- [在Linux/Ubuntu/Debian系统中使用 tar 压缩文件 - 知乎](https://zhuanlan.zhihu.com/p/701415683)
- [Linux tar 命令 | 菜鸟教程](https://www.runoob.com/linux/linux-comm-tar.html)
- [MySQL 管理 | 菜鸟教程](https://www.runoob.com/mysql/mysql-administration.html)

</div>
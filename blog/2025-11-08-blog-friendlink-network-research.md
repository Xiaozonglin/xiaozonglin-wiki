---
id: 436
title: 针对博客网站友链的随机网络研究
date: '2025-11-08T22:34:20+08:00'
author: 林林
excerpt: 为探究博客友链网络的拓扑特征及本质属性，验证其是否属于随机网络、是否存在小世界现象，以集博栈等多源博客列表为数据基础，通过多线程爬取博客首页及友链页面，结合AI判定与人工抽检筛选有效博客节点，构建博客友链网络数据集。运用网络分析方法，对网络最短距离、聚类系数、度分布、传递性、社区结构等核心指标进行量化分析。结果表明：博客友链网络中绝大多数节点对的最短距离集中在4-6之间，平均最短距离为5.11，呈现显著小世界特征；度分布符合幂律分布，存在少数枢纽节点，与随机网络的泊松分布存在本质差异。研究结论显示，博客友链网络并非随机网络，而是以社交互访需求为主导的小世界网络。
layout: post
guid: 'https://www.xiaozonglin.cn/?p=436'
permalink: /blog-friendlink-network-research/
footnotes:
    - '[{"content":"\u5e9e\u666f\u5b89.Web \u5c0f\u4e16\u754c\u7279\u5f81\u7684\u7f51\u7edc\u8ba1\u91cf\u5b66\u7814\u7a76[J].\u60c5\u62a5\u79d1\u5b66,2007 (08):1171-1175.","id":"bb5247b6-79ab-4cd6-949d-b60bb3dba1aa"},{"content":"J.\u594e\u6839,\u5f20\u658c. \u535a\u5ba2\u3001\u7ef4\u57fa\u548c\u521b\u9020\u6027\u9769\u65b0[J]. \u56fd\u5916\u793e\u4f1a\u79d1\u5b66,2008,(03):98-104.","id":"0cdb5103-a090-4933-a1af-419988dd8ac4"},{"content":"\u5f20\u6f6e. \u5982\u4f55\u505a\u597d\u53cb\u60c5\u94fe\u63a5\u4ea4\u6362[J]. \u8ba1\u7b97\u673a\u4e0e\u7f51\u7edc,2016,42(23):42-43.","id":"c102c68b-7bfc-4d1e-926c-c62cbaa17092"},{"content":"eallion''s Blog. \u53cb\u60c5\u94fe\u63a5. https:\/\/www.eallion.com\/links\/","id":"045cd4fe-e29e-4b04-b922-6980cba820db"},{"content":"\u7b14\u8005\u6309\u641c\u7d22\u7ed3\u679c\u7684\u987a\u5e8f\u67e5\u770b\u4e8615\u4e2a\u53cb\u94fe\u9875\u9762\uff0c\u4ec5\u6709\u7684\u63d0\u53ca\u6743\u91cd\u7684\u7f51\u7ad9\u4e5f\u53ea\u662f\u501f\u6743\u91cd\u6392\u9664\u6076\u610f\u53cb\u94fehttps:\/\/geektutu.com\/post\/blog-experience-5.html","id":"94fd6a83-ba3f-45f5-b67b-8804ca9c1ec8"},{"content":"\u6570\u636e\u6765\u81ea\u5176\u5e94\u7528\u7a0b\u5e8f\u63a5\u53e3 https:\/\/bf.zzxworld.com\/api\/sites.\u6570\u4e8e2025\u5e7411\u67088\u65e5\u6536\u96c6","id":"20e8f629-8c9c-4eb2-8b21-926da5b4fc1a"},{"content":"\u6570\u636e\u6765\u81ea\u5176\u6536\u5f55\u9875\u9762 https:\/\/blogwe.com\/allblogs.html.\u00a0\u6570\u636e\u4e8e2025\u5e7411\u67088\u65e5\u6536\u96c6","id":"3a74978e-d483-470d-9e96-ceebbf943f5c"},{"content":"\u6570\u636e\u6765\u81ea\u9996\u9875 https:\/\/alexsci.com\/rss-blogroll-network\/\u663e\u793a\u5176\u6536\u4e867952\u4e2a\u8ba2\u9605\u5730\u5740.\u00a0\u5047\u8bbe\u4e00\u4e2a\u8ba2\u9605\u5730\u5740\u5bf9\u5e94\u4e00\u4e2a\u535a\u5ba2\u53ef\u7c97\u7565\u4f30\u8ba1\u6536\u5f55\u4e867900\u4e2a\u535a\u5ba2.\u6570\u636e\u4e8e2025\u5e7411\u67088\u65e5\u6536\u96c6","id":"0191646a-2df2-4ac3-8847-8c875eb85197"},{"content":"\u6570\u636e\u6765\u81ea\u5176\u6536\u5f55\u9875\u9762https:\/\/www.blogsclub.org\/members.html.\u00a0\u6570\u636e\u4e8e2025\u5e7411\u67088\u65e5\u6536\u96c6","id":"bcc2b3c8-9c83-42fc-9d59-cffa55004a8c"},{"content":"\u6570\u636e\u6765\u81ea\u9996\u9875https:\/\/www.foreverblog.cn\/\u5e95\u90e8\u7684\u5c65\u7ea6\u6570\u636e.\u6570\u636e\u4e8e2025\u5e7411\u67088\u65e5\u6536\u96c6","id":"c2fb83ba-1167-4511-bb5f-6274063661e7"},{"content":"\u6570\u636e\u6765\u81ea\u9996\u9875https:\/\/www.zhblogs.net\/\u5e95\u90e8\u7684\u6536\u5f55\u535a\u5ba2\u6570\u91cf.\u6570\u636e\u4e8e2025\u5e7411\u67088\u65e5\u6536\u96c6","id":"4a578942-d760-47c0-8602-8ddd02d38e5b"}]'
ppma_authors_name:
    - 林林
categories:
    - 技术与研究
tags:
    - 博客
    - 友链
    - 小世界现象
    - 网络研究
format: false
---

**关键词**：博客友链网络；随机网络；小世界现象；数据爬取

## 一、前言

“六度分离”理论已在社交网络、互联网等领域被研究<sup class="fn" data-fn="bb5247b6-79ab-4cd6-949d-b60bb3dba1aa">[1](#bb5247b6-79ab-4cd6-949d-b60bb3dba1aa)</sup>。博客网站作为Web2.0的代表，其形成的友链网络是否可视为随机网络？小世界现象在博客网络中是否存在？这是本文想要研究的问题。

笔者依照浏览博客的经历做出假设：博客友链在一定程度上参杂了博主的个人喜好，可能在一定程度上表现出规律性，更偏向于小世界网络，无法视为随机网络，小世界现象在博客网络中存在。

本文期望对较大体量的博客网络进行研究，明晰以下问题：访客从一个博客到另一个博客平均需要经过多少个博客？每个博客平均有多少个友链？

博客是一种杂志形式的私人网络日记。博客软件自动将新条目（帖子）放在网页的顶端，每过一定的时间，或每当帖子太多不便于翻阅时，博客软件就会把旧条目放进博客档案。<sup class="fn" data-fn="0cdb5103-a090-4933-a1af-419988dd8ac4">[2](#0cdb5103-a090-4933-a1af-419988dd8ac4)</sup>友链，即友情链接，指两个网站之间架起一座桥梁，实现流量的互通。<sup class="fn" data-fn="c102c68b-7bfc-4d1e-926c-c62cbaa17092">[3](#c102c68b-7bfc-4d1e-926c-c62cbaa17092)</sup>友情链接在门户、电商网站常被用作搜索引擎优化的一种手法，也被学界认为是引入流量、提高权重的工具。但笔者认为，在博客中，友情链接在搜索引擎优化方面的作用减弱，交流、互访等社交方面的作用得到增强。“从20年前建站伊始，我的友情链接页面就不是以SEO或其他什么乱七八糟的目的而存在。”<sup class="fn" data-fn="045cd4fe-e29e-4b04-b922-6980cba820db">[4](#045cd4fe-e29e-4b04-b922-6980cba820db)</sup>笔者通过丑搜（一款中文博客搜索引擎）以“友情链接”为关键词搜索博客网站的友链页面，绝大部分博客<sup class="fn" data-fn="94fd6a83-ba3f-45f5-b67b-8804ca9c1ec8">[5](#94fd6a83-ba3f-45f5-b67b-8804ca9c1ec8)</sup>没有在友情链接页面要求网站权重。博客友链具有相互性（友链应当是两个博客之间的互链），为研究方便起见，笔者将友链规定为博客在首页和友链页面对其他博客的外链，无论其是单向的还是双向的。

爬取博客网站首先需要获取一个数据量比较大的博客列表，笔者查阅了一位博主自发收集的博客列表<sup>\[4\]</sup>，并对列表的数据量进行统计，结果如表 1。

<figure class="wp-block-table">| 名称 | 数据量 |
|---|---|
| BlogFinder | 1699个博客<sup class="fn" data-fn="20e8f629-8c9c-4eb2-8b21-926da5b4fc1a">[6](#20e8f629-8c9c-4eb2-8b21-926da5b4fc1a)</sup> |
| BlogWe | 282个博客<sup class="fn" data-fn="3a74978e-d483-470d-9e96-ceebbf943f5c">[7](#3a74978e-d483-470d-9e96-ceebbf943f5c)</sup> |
| Blogroll Network Map | 约7900个博客<sup class="fn" data-fn="0191646a-2df2-4ac3-8847-8c875eb85197">[8](#0191646a-2df2-4ac3-8847-8c875eb85197)</sup> |
| BlogsClub | 368个博客<sup class="fn" data-fn="bcc2b3c8-9c83-42fc-9d59-cffa55004a8c">[9](#bcc2b3c8-9c83-42fc-9d59-cffa55004a8c)</sup> |
| 十年之约 | 1818个博客<sup class="fn" data-fn="c2fb83ba-1167-4511-bb5f-6274063661e7">[10](#c2fb83ba-1167-4511-bb5f-6274063661e7)</sup> |
| 集博栈 | 4115个博客<sup class="fn" data-fn="4a578942-d760-47c0-8602-8ddd02d38e5b">[11](#4a578942-d760-47c0-8602-8ddd02d38e5b)</sup> |

<figcaption class="wp-element-caption">表1 部分博客列表的数据信息</figcaption></figure>## 二、研究过程

按照博客列表收录数据的体量，笔者使用了Blogroll Network Map、BlogFinder、十年之约和集博栈的数据。对上述几个博客列表的数据进行爬取，将去重后的数据中的博客名称和博客地址存入数据库，如图1。

<figure class="wp-block-image aligncenter size-full">![](/wp-content/uploads/2025/11/image-1.png)<figcaption class="wp-element-caption">图1 存储博客网站信息</figcaption></figure>接着对博客网站的首页和友链页面进行爬取。在此过程中，程序通过两条途径得到友链页面的URI：在首页搜索是否有链接文本包含“友情链接”等字样的链接；尝试一些常见的友链页面的URI是否存在。

<figure class="wp-block-image aligncenter size-full">![](/wp-content/uploads/2025/11/image-2.png)<figcaption class="wp-element-caption">图 2 预先设置一些常见的页面URI进行穷举</figcaption></figure>若博客有链接到另一个博客的外链，则将其视为友链，将这个关系存储到数据库；若博客的外链地址不在此前存储的博客数据库中，则将链接地址存入外链数据库，方便后续步骤发现此前没有发现的博客。

在爬取博客首页和友链页面的程序运行之后，数据库中存储的外链数量快速增长。在程序进行到一半时，数据库中存储的外链已经达到了4485条（过程中已经按照外链的域名进行去重）。这已经超过了笔者能够人工处理的范围。

笔者将外链的网页标题、描述、URL、关键词、订阅链接、文章链接数量、导航结构等信息交给AI，由AI判定外链是否为博客。

<figure class="wp-block-image aligncenter size-full">![](/wp-content/uploads/2025/11/image-4.png)<figcaption class="wp-element-caption">图 3 传递给AI的数据</figcaption></figure>但这种方法伴随着大量的token消耗。在判断出40余个博客网站后，腾讯混元赠送的100万个token就耗尽了。面对这一问题，设置了博客网站的一些特征，例如“文章”“评论”等，程序将对外链的特征进行评分，判断外链是否为博客网站。

为了缩短程序运行的时间，程序采用多线程运行。

在程序完成博客网站的判断之后，笔者对数据库存储的博客网站进行人工抽检，如图4。人工抽检的355个网站中，有48个不是博客网站，其中大部分为域名过期。

<figure class="wp-block-image aligncenter size-full">![](/wp-content/uploads/2025/11/image-6.png)<figcaption class="wp-element-caption">图 4 人工抽检界面</figcaption></figure>通过程序可以绘制出博客之间的平均距离图像。

## 三、研究结果

<figure class="wp-block-image size-large">![](/wp-content/uploads/2025/11/Figure_1-1024x410.png)</figure><figure class="wp-block-image size-large">![](/wp-content/uploads/2025/11/Figure_2-1024x577.png)</figure><figure class="wp-block-image size-large">![](/wp-content/uploads/2025/11/Figure_3-1024x577.png)</figure>由上图，我们可以看到：

- 博客友链网络中绝大多数博客对的最短距离集中在4-6之间，小世界现象在博客友链中存在。
- 几乎所有博客对的最短距离不超过6。
- 最短距离的标准差较小，博客之间距离的分布波动性较弱。
- 网络的聚类度较低，博客的友链不集中，友链“抱团”现象不明显。

由图7的度分布图可知，小度节点（博客）数量极多，大度节点数量稀少，满足幂律分布，与随机网络满足的泊松分布不同。故，博客友链网络不是随机网络。

## 本文的缺陷

在本篇文章发布之后，一些博主对本文展开比较激烈的讨论。我认为有必要针对本文的缺陷和漏洞进行说明，供读者批评，后来者改进。

在我将此文作为课程论文提交之后，老师指出了一些问题：

> - 个人感觉论文的第二部分（研究过程）存在瑕疵。友链的发现所采用的两种方式，似乎**本身就将结论导向了你的假设**，且并未对占比等**数据有效性进行检查（如，是否漏掉了大量不在常见URI列表中的友链）。**
> - 对博客友链的介绍不足（也可能就是现实，我并不了解；或者是你专门藏起来准备作为结论的？），博客友链设定是否有什么规则或传统？

我不得不承认，本文通过友链发现博客的方式本身就有把结论导向假设的倾向，因为本文几乎排除了没有友链也鲜为人知的博客（孤岛）。本文探讨的友链网络也就不能代表全体博客。

此外，本文在数据清洗方面做得还不够。当时从早上生成代码，下午爬取友链直到晚上，后面只是随机抽取了两百多个博客进行检查。如您所见，本文提供的数据后面有不少需要剔除的站点，本文也没有成功抓取 Blogroll Network Map 的数据，这导致本文的样本量较少，代表性较弱。

## 附录与参考文献

本文的代码和原始数据均公开于GitHub仓库<https://github.com/Xiaozonglin/blog-friendlink-network-research>  
供复现和检验。
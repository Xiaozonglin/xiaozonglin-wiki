---
id: 645
title: 博客访问体验量化评估方法的失败探索尝试
date: '2026-01-26T23:32:12+08:00'
author: 林林
excerpt: 本文是对博客访问体验进行量化评估的一次技术探索，然而并未提出成熟的量化评估体系。
layout: post
guid: 'https://www.xiaozonglin.cn/?p=645'
permalink: /a-failed-exploratory-attempt-at-quantifying-blog-visit-experience/
footnotes:
    - '[{"content":"孙聪妮.视觉元素在网页设计中的应用与研究[J].卫星电视与宽带多媒体,2019,(19):56-57","id":"e59afa37-c251-49bf-bc65-775dec15493a"}]'
ppma_authors_name:
    - 林林
categories:
    - 技术与研究
tags:
    - 博客
format: false
---

## 1. 前言

在浏览博客的过程当中，有一些博客以其花里胡哨的设计掩盖其贫瘠的内容。今天在友情链接串门的时候发现博友发了一篇[《老派博主的博客体验笔记》](https://www.weisay.com/blog/old-bloggers-notes.html)，将访问体验这个东西又搬到台面上讨论。文章评论区多是吐槽文中提及的这种花里胡哨的设计。若是吐槽，我没办法发出什么有新意的评论。如何建立一套量化评估博客访问体验的方法，给出一个能够代表博客访问体验的数值，这让我感兴趣。

本文预期达成以下目标：

- 给出一个量化博客访问体验的公式
- 给出公式中一些权重值的支撑实例
- 建立一个测试博客访问体验的网站，给出得分和改进建议

你可以直接跳到本文的[后言](#4houyan)。

## 2. 影响因素

网页设计的过程中应当有效管理视觉配色、规范设计排版样式和精简 Tab 标签信息等事项<sup class="fn" data-fn="e59afa37-c251-49bf-bc65-775dec15493a">[1](#e59afa37-c251-49bf-bc65-775dec15493a)</sup>。结合各位大佬发的文章（[《谈谈不受欢迎的博客技术特征》](https://blog.zhilu.site/2025/unpopular-blog-tech)、[《关于无后端 web 服务的优化方案和思路》](https://lemonkoi.one/posts/share/17)、[《中文博客倡议》](https://howiehz.top/archives/chinese-blog-guidelines#CBGB006)等），容我粗略总结博客访问体验的影响因素，也就是评估应该纳入考量的东西。

- 访问所需时间（域名解析耗时、TTFB、FCP、LCP等）
- 不必要的特效（鼠标移动、评论区打字时的特效）
- 与博客功能没有关联的设计（华丽的背景大图、看板娘、弹窗、切换标签页改标题、悬浮音乐播放组件、广告过滤程序检测器）
- 影响阅读的设计（难以阅读的艺术字体、颜色对比度、文字大小、无订阅源）
- 烦人的限制（禁止复制、右键、F12）
- 没什么内容的文章还弄 AI 摘要
- 移动端的适配

访问所需时间以及与浏览器有关的指标基本都可以用代码来测。下面由我对影响因素进行逐一分析。

### 2.1 访问所需时间

为了探究访问所需时间的几个指标的影响，我对 100 个博客进行了测试，由于网络条件，我只测试成功了 36 个，拉了一张表出来。

<figure class="wp-block-table alignwide is-style-stripes">| 序号 | 博客名称 | URL | 总耗时(s) | TTFB(s) | LCP(ms) | DOM加载(ms) |
|---|---|---|---|---|---|---|
| 1 | TomyJan 的博客 | https://blog.tomys.top | ***29.044*** | 0.040 | 19951 | 2232 |
| 2 | 不淡定的实验室 | https://xd.sh.cn | ***27.441*** | 0.366 | 18673 | 2303 |
| 15 | 御坂の地下室 | https://misakamoe.com | 9.494 | ***2.110*** | 4320 | 4876 |
| 18 | 花开陌上 | https://moshanghua.net | 9.160 | ***1.590*** | 4050 | 4108 |
| 35 | 夏日鱼塘 | https://www.summerpond.cn | 6.176 | 0.089 | 1676 | 1550 |
| 36 | MBRjun-Blog | https://www.libmbr.com | 5.879 | 0.044 | 1257 | 1313 |

<figcaption class="wp-element-caption">表一 36 个博客的访问耗时、TTFB、LCP 和 DOM 加载耗时</figcaption></figure>上表中的第 1 个博客虽然测出来的总耗时较长，但是实际访问似乎在 1500ms 前就将主体内容（网站名称、简介、背景图片）加载出来了，后面不知道在加载什么东西。自动播放音乐 + 弹窗广告 + 切换标签页改标题 + 看板娘，后面可以用这个网站做测试（也是 buff 叠满了）。第 2 个网站也是，前 1500ms 就把文章列表这些内容加载好了，后面请求 gravatar 头像的时候拖了 14 秒……感觉是这些没用的资源把 LCP 抬高到原本不属于它的高度。虽然无语，但是这两个例子说明页面加载的总耗时没办法代表我们访问博客时的实际体验。TTFB 能稍微体现访问网站刚开始空白加载的时间，但代表性不大。DOM 加载时间的差别我访问时是感受不到的。

啊，感觉找的这几个指标都挺废的（虽然指标优秀的博客访问体验的确挺好）。于是，我问 Deepseek：

> 你知道有什么指标可以用来描述页面加载的流畅程度吗？有些网页 1500ms 前就把主体内容加载出来了，但是后面在加载一些无关紧要的东西，拉长了加载时间，LCP 也不低。

它向我推荐 Speed Index 和 TTI 这两个指标，「页面内容视觉填充的速度」和「页面完全可交互的时间」，感觉是我想要的指标。拿这两个指标再测一下，拉一个表。

<figure class="wp-block-table alignwide is-style-stripes">| 排名 | 博客名称 | URL | Speed Index(ms) | TTI(ms) |
|---|---|---|---|---|
| 1 | Foxhole | https://blog.southfox.me | 15903 | 10541 |
| 2 | 异国迷宫的十字路口 | https://blog.fivezha.cn | 14955 | 3264 |
| 3 | ADD-SP‘s Blog | https://www.addesp.com | 14402 | 11609 |
| 56 | 杜老师说 | https://dusays.com | 2137 | 1519 |
| 57 | 夏日鱼塘 | https://www.summerpond.cn | 1731 | 1591 |
| 58 | MBRjun-Blog | https://www.libmbr.com | 1429 | 1317 |
| 59 | Declan's Blog | https://blog.haojin.li | 1092 | 1092 |

<figcaption class="wp-element-caption">表二 部分博客的 Speed Index 和 TTI</figcaption></figure>不得不说，这两个指标还真「有点东西」。Speed Index 高的博客相比于 Speed Index 低的博客页面加载感觉会慢一点。TTI 在一些 Speed Index 比较高的博客反而比较低，例如表一的第 1 个博客，Speed Index 为 13580ms，而 TTI 却为 2144ms，有一些资源加载很慢，但页面主体加载比较快，访客访问很快就可以与页面交互了。因此，TTI 比 Speed Index 更能够描述页面主体的加载速度。

故，我们可以粗略定义一个基于访问速度的因子：

<div class="wp-block-math"><math display="block"><semantics><mrow><mtext>Factor</mtext><mo>=</mo><mn>100</mn><mo>×</mo><mfrac><mn>2.5</mn><mrow><mn>2.5</mn><mo>+</mo><mrow><mi>ln</mi><mo>⁡</mo></mrow><mrow><mo fence="true" form="prefix">(</mo><mn>1</mn><mo>+</mo><mfrac><mtext>TTI</mtext><mn>1200</mn></mfrac><mo>+</mo><mfrac><mtext>Speed Index</mtext><mn>1800</mn></mfrac><mo>+</mo><mfrac><mrow><mtext>TTFB</mtext><mo>×</mo><mn>1000</mn></mrow><mn>350</mn></mfrac><mo fence="true" form="postfix">)</mo></mrow></mrow></mfrac></mrow><annotation encoding="application/x-tex">\\text{Factor} = 100 \\times \\frac{2.5}{2.5 + \\ln\\left(1 + \\frac{\\text{TTI}}{1200} + \\frac{\\text{Speed Index}}{1800} + \\frac{\\text{TTFB} \\times 1000}{350}\\right)}</annotation></semantics></math></div>我们可将 Factor 视作 TTI(ms)、Speed Index(ms) 和 TTFB(ms) 的函数，函数具有以下性质：

- 单调递减：随着性能指标变差（TTI↑、SI↑、TTFB↑），因子↓
- 值域：(0, 100\]，理论上不可能达到100，易于理解
- 对数让 Factor 更贴近人眼的感受

我又双叒给这个 Factor 拉了一张表。

<figure class="wp-block-table alignwide is-style-stripes">| 排名 | 博客名称 | URL | Factor |
|---|---|---|---|
| 1 | MBRjun-Blog | https://www.libmbr.com | 69.84 |
| 2 | ncc 的个人网站 | https://www.zqcnc.cn | 69.49 |
| 3 | 杜老师说 | https://dusays.com | 67.77 |
| 4 | 夏日鱼塘 | https://www.summerpond.cn | 67.76 |
| 5 | SkYe's Blog | https://www.mrskye.cn | 64.98 |
| 23 | F 君的博客 | https://blog.fkun.tech | 50.95 |
| 24 | 静静的小窝 | https://wznmickey.com | 49.95 |
| 25 | HandSonic‘s Blog | https://handsonic.top | 47.67 |
| 26 | 提莫酱的博客 | https://www.timochan.cn | 46.75 |
| 27 | 人家故里 | https://fx7.top | 46.45 |

<figcaption class="wp-element-caption">表三 Factor解析式方案一实测数据</figcaption></figure>原本还有另外一个解析式来增大不同博客 Factor 的区分度，但是测了一遍「属实」是太有区分度了，没用这个。既然做了，公式和数据贴在这里。

<div class="wp-block-math"><math display="block"><semantics><mrow><mtext>Factor</mtext><mo>=</mo><mrow><mi>max</mi><mo>⁡</mo></mrow><mrow><mo fence="true" form="prefix">(</mo><mn>0</mn><mo separator="true">,</mo><mn>100</mn><mo>−</mo><msup><mrow><mo fence="true" form="prefix">(</mo><mfrac><mtext>TTI</mtext><mn>50</mn></mfrac><mo>+</mo><mfrac><mtext>Speed Index</mtext><mn>100</mn></mfrac><mo>+</mo><mtext>TTFB</mtext><mo>×</mo><mn>200</mn><mo fence="true" form="postfix">)</mo></mrow><mn>0.7</mn></msup><mo fence="true" form="postfix">)</mo></mrow></mrow><annotation encoding="application/x-tex">\\text{Factor} = \\max\\left(0, 100 - \\left(\\frac{\\text{TTI}}{50} + \\frac{\\text{Speed Index}}{100} + \\text{TTFB} \\times 200\\right)^{0.7}\\right)</annotation></semantics></math></div><figure class="wp-block-table alignwide is-style-stripes">| 排名 | 博客名称 | URL | Factor |
|---|---|---|---|
| 1 | f2h2h1's blog | https://f2h2h1.github.io | 89.97 |
| 2 | 飞刀博客 | https://www.feidaoboke.com | 86.93 |
| 3 | 爱吃肉的猫 | https://meuicat.com | 85.81 |
| 4 | 晓雨杂记 | https://www.lihaoyu.cn | 85.78 |
| 5 | MBRjun-Blog | https://www.libmbr.com | 85.72 |
| 100 | BOB'S BLOG | https://www.itbob.cn | 76.54 |
| 101 | Revincx 的小破站 | https://blog.revincx.icu | 76.31 |
| 102 | a.d博客 | https://blog.aiheadn.cn/ | 76.16 |
| 103 | 刘郎阁 | https://vjo.cc | 76.12 |
| 104 | 树洞笔记 | https://www.x8xx.cn | 76.05 |
| 105 | 无用笔记 | https://www.xhily.com/ | 76.00 |
| 251 | 希望的博客 | https://www.xiwangly.com | 56.69 |
| 252 | 空鸣深语 | https://blog.deepchirp.com | 56.56 |
| 253 | 陌子夕生活记 | https://mozixi.com | 56.28 |
| 254 | 异国迷宫的十字路口 | https://blog.fivezha.cn | 55.99 |
| 255 | 夜庭記 | https://musenxi.com | 55.95 |
| 304 | F 君的博客 | https://blog.fkun.tech | 30.51 |
| 305 | 阿云的宝库 | https://www.yunxge.cn | 28.91 |
| 306 | imba久期的博客 | https://imba97.com | 28.76 |
| 307 | Sakitami 的集装箱 | https://blog.skihome.xyz | 19.38 |
| 308 | 海蓝岛 | https://hailandao.com/ | 9.80 |

<figcaption class="wp-element-caption">表四 Factor解析式方案二实测数据</figcaption></figure>### 2.2 不必要的特效和设计

原本以为这一块的检测做起来会比较容易，没想到 Deepseek 给出的几版代码误报都很严重，比如误报禁止 F12，误报对比度不足，报告标题文字过大等等……（已晕厥）

程序在检测看板娘、弹窗的时候采用的方式有限，只是通过检测 live2d、waifu、kanban、看板娘、pio 等关键词来实现。

<figure class="wp-block-image aligncenter size-full is-resized">[![](/wp-content/uploads/2026/01/image.png)](/wp-content/uploads/2026/01/image.png)<figcaption class="wp-element-caption">图一 检测结果</figcaption></figure><math data-latex="Factor_{\text{design}}"><semantics><mrow><mi>F</mi><mi>a</mi><mi>c</mi><mi>t</mi><mi>o</mi><msub><mi>r</mi><mtext>design</mtext></msub></mrow><annotation encoding="application/x-tex">Factor\_{\\text{design}}</annotation></semantics></math>初始化为 100 分，然后按照不同类型的问题扣减不同的分数。

<figure class="wp-block-image aligncenter size-full">[![](/wp-content/uploads/2026/01/image-1.png)](/wp-content/uploads/2026/01/image-1.png)<figcaption class="wp-element-caption">图二 分数生成代码</figcaption></figure>由两个因子组成总分数。

<div class="wp-block-math"><math display="block"><semantics><mrow><mi>S</mi><mi>c</mi><mi>o</mi><mi>r</mi><msub><mi>e</mi><mtext>total</mtext></msub><mo>=</mo><mfrac><mrow><mi>F</mi><mi>a</mi><mi>c</mi><mi>t</mi><mi>o</mi><msub><mi>r</mi><mtext>perf</mtext></msub><mo>×</mo><mi>F</mi><mi>a</mi><mi>c</mi><mi>t</mi><mi>o</mi><msub><mi>r</mi><mtext>design</mtext></msub></mrow><mn>100</mn></mfrac></mrow><annotation encoding="application/x-tex">Score\_{\\text{total}} = \\frac{Factor\_{\\text{perf}} \\times Factor\_{\\text{design}}}{100}</annotation></semantics></math></div>## 3. 搭建测试网站

使用 Flask 弄了一个小网站，可以输入一个博客，会给出博客的分数。然后我拿我自己的博客进去测了一下：不合格。（事已至此，已成艺术）

<figure class="wp-block-image aligncenter size-large is-resized">[![](/wp-content/uploads/2026/01/image-2-905x1024.png)](/wp-content/uploads/2026/01/image-2.png)<figcaption class="wp-element-caption">图三 拿我自己的博客进去测试一下</figcaption></figure>## 4. 后言

对比前言提出的预期目标，本文既没能给出一个令人信服的公式，也没能搭建一个可以对访问体验进行测量的框架。本文所做实验是相当失败的。

本文没能正确评估这项工程的复杂性。打开一个网页给人的主观感受不是一两个指标所能反应的，总有博客与实验预期格格不入。探测悬浮组件、鼠标特效也缺乏有效的方案。指标只能反映出过程的某个侧面。我在对比数据的过程中，有时感觉不到数值差异巨大的博客给我感受上的差别。

若有人能够对博客的访问速度、内容质量、页面设计进行量化，并用作对博客进行筛选的指标，那量化的东西就不再是好的了。“当一项指标成为目标时，它就不再是一个好指标了。”古德哈特就像这些指标的诅咒。我失败了，就没脸说量化这个东西是个徒劳。愿意尝试这个东西的人也不会把这篇文章当回事。模拟不出来是我菜，不是不行。

本文的用处可能远没有谈论博客体验的博文用处大。

抱歉，各位读者。

## 附录与参考文献

[Xiaozonglin/webpage-visit-feeling-score: 博客访问体验量化评估方法的失败探索尝试](https://github.com/Xiaozonglin/webpage-visit-feeling-score)
---
id: 1375
title: 小东西：用FreshRSS实现带AI摘要的订阅推送
date: '2026-05-10T12:38:40+08:00'
author: 林林
excerpt: '用FreshRSS + Python + Napcat实现带AI摘要的订阅QQ群推送'
layout: post
guid: 'https://www.xiaozonglin.cn/?p=1375'
permalink: /xdsec-push-bot/
categories:
    - 开发
tags:
    - Python
format: false
---

前几天在协会问了一下有没有什么开发任务，然后找了一个开发订阅推送的活。

<figure class="wp-block-image aligncenter size-full">![](/wp-content/uploads/2026/05/image.png)<figcaption class="wp-element-caption">聊天记录（昵称和头像已用白色遮罩）</figcaption></figure>工具需要实现的功能是：定时爬取一些安全newsletter和博客的订阅源，并将爬取到的文章推送到协会的QQ群，要有AI的摘要。

<figure class="wp-block-table">| 模块 | 任务 |
|---|---|
| FreshRSS | 爬取、存储内容 |
| Napcat | 部署QQ机器人 |
| Python | 脚本对接AI、FreshRSS和Napcat |

</figure><figure class="wp-block-image aligncenter size-large">![](/wp-content/uploads/2026/05/image-1-1024x106.png)<figcaption class="wp-element-caption">流程图</figcaption></figure>FreshRSS我用Docker方式部署，在应用中开放接口登录并设置一下API密钥，原本打算自己看着接口文档搞的，结果一搜发现Python有对应的接口库[freshrss-api](https://pypi.org/project/freshrss-api/)，直接就拿来用了。

<div class="wp-block-kevinbatdorf-code-block-pro cbp-has-line-numbers cbp-blur-enabled cbp-unblur-on-hover" data-code-block-pro-font-family="Code-Pro-JetBrains-Mono" style="font-size:clamp(14px, .875rem, 21px);font-family:Code-Pro-JetBrains-Mono,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;--cbp-line-number-color:#000000;--cbp-line-number-width:calc(2 * 0.6 * .875rem);line-height:clamp(20px, 1.25rem, 30px);--cbp-tab-width:2;tab-size:var(--cbp-tab-width, 2)"><span style="display:flex;align-items:center;padding:10px 0px 0 16px;font-size:0.8em;width:100%;text-align:left;background-color:#FFFFFF;font-style:italic;color:#000000"><span style="border-bottom:1px solid rgba(0, 0, 0, 0.2)">Python</span></span><span aria-label="复制" class="code-block-pro-copy-button" role="button" style="color:#000000;display:none" tabindex="0">```
<textarea aria-hidden="true" class="code-block-pro-copy-button-textarea" readonly="readonly" tabindex="-1">from freshrss_api import FreshRSSAPI
client = FreshRSSAPI(
    host="xxx",
    username="xxx",
    password="xxx",
    verbose=False
)

unread_items = client.get_unreads()

passages = []
pass_text = ""


for i in unread_items:
    passages.append([i.author, i.title, i.url, i.html, str(trafilatura.extract(trafilatura.fetch_url(i.url), output_format='markdown', include_tables=True))])
    client.set_mark(as_="read", id=i.id)</textarea>
```

<svg fill="none" stroke="currentColor" stroke-width="2" style="width:24px;height:24px" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path class="with-check" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"></path><path class="without-check" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>```
<span class="line"><span style="color: #AF00DB">from</span><span style="color: #000000"> freshrss_api </span><span style="color: #AF00DB">import</span><span style="color: #000000"> FreshRSSAPI</span></span>
<span class="line"><span style="color: #000000">client = FreshRSSAPI(</span></span>
<span class="line"><span style="color: #000000">    </span><span style="color: #001080">host</span><span style="color: #000000">=</span><span style="color: #A31515">"xxx"</span><span style="color: #000000">,</span></span>
<span class="line"><span style="color: #000000">    </span><span style="color: #001080">username</span><span style="color: #000000">=</span><span style="color: #A31515">"xxx"</span><span style="color: #000000">,</span></span>
<span class="line"><span style="color: #000000">    </span><span style="color: #001080">password</span><span style="color: #000000">=</span><span style="color: #A31515">"xxx"</span><span style="color: #000000">,</span></span>
<span class="line"><span style="color: #000000">    </span><span style="color: #001080">verbose</span><span style="color: #000000">=</span><span style="color: #0000FF">False</span></span>
<span class="line"><span style="color: #000000">)</span></span>
<span class="line"></span>
<span class="line cbp-no-blur"><span style="color: #000000">unread_items = client.get_unreads()</span></span>
<span class="line"></span>
<span class="line"><span style="color: #000000">passages = []</span></span>
<span class="line"><span style="color: #000000">pass_text = </span><span style="color: #A31515">""</span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line cbp-no-blur"><span style="color: #AF00DB">for</span><span style="color: #000000"> i </span><span style="color: #AF00DB">in</span><span style="color: #000000"> unread_items:</span></span>
<span class="line cbp-no-blur"><span style="color: #000000">    passages.append([i.author, i.title, i.url, i.html, </span><span style="color: #267F99">str</span><span style="color: #000000">(trafilatura.extract(trafilatura.fetch_url(i.url), </span><span style="color: #001080">output_format</span><span style="color: #000000">=</span><span style="color: #A31515">'markdown'</span><span style="color: #000000">, </span><span style="color: #001080">include_tables</span><span style="color: #000000">=</span><span style="color: #0000FF">True</span><span style="color: #000000">))])</span></span>
<span class="line cbp-no-blur"><span style="color: #000000">    client.set_mark(</span><span style="color: #001080">as_</span><span style="color: #000000">=</span><span style="color: #A31515">"read"</span><span style="color: #000000">, </span><span style="color: #001080">id</span><span style="color: #000000">=i.id)</span></span>
```

</div>思路大概是这样，每次推送的时候都从未读的文章里面取，取出来就把文章设置为已读。

在获取到还未推送的文章（未读文章）之后，接着需要爬取文章的内容，供后面AI推荐和生成摘要使用。此处使用的是trafilatura库（[星火杯参赛小记](/spark-bei-participate-small-ji/) 用过的），可以将网页内容清洗成Markdown。因为遇到反爬时可能会返回None，导致后面字符串拼接时可能报错，所以对清洗出的结果用`str( )`进行强制转换。

<div class="wp-block-kevinbatdorf-code-block-pro cbp-blur-enabled" data-code-block-pro-font-family="Code-Pro-JetBrains-Mono" style="font-size:clamp(14px, .875rem, 21px);font-family:Code-Pro-JetBrains-Mono,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;--cbp-line-number-width:calc(2 * 0.6 * .875rem);line-height:clamp(20px, 1.25rem, 30px);--cbp-tab-width:2;tab-size:var(--cbp-tab-width, 2)"><span style="display:flex;align-items:center;padding:10px 0px 0 16px;font-size:0.8em;width:100%;text-align:left;background-color:#FFFFFF;font-style:italic;color:#000000"><span style="border-bottom:1px solid rgba(0, 0, 0, 0.2)">Python</span></span><span aria-label="复制" class="code-block-pro-copy-button" role="button" style="color:#000000;display:none" tabindex="0">```
<textarea aria-hidden="true" class="code-block-pro-copy-button-textarea" readonly="readonly" tabindex="-1">if len(passages) > 5:
    pass_text += "本次抓取文章数大于5篇，根据AI推荐，推送五篇较有价值的文章。\n"
    push_index = getAIrecom(passage_list=passages)
    for i in range(5):
        pass_text += f"Title: {passages[int(push_index[i])][1]} \nURL: {passages[int(push_index[i])][2]} \nBrief: {aibrief(passages[int(push_index[i])][4], passages[int(push_index[i])][3])}\n\n"
elif len(passages) == 0:
    exit(0)
else:
    for i in passages:
        pass_text += f"Title: {i[1]} \nURL: {i[2]} \nBrief: {aibrief(i[4], i[3])}\n\n"</textarea>
```

<svg fill="none" stroke="currentColor" stroke-width="2" style="width:24px;height:24px" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path class="with-check" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"></path><path class="without-check" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>```
<span class="line cbp-no-blur"><span style="color: #AF00DB">if</span><span style="color: #000000"> </span><span style="color: #795E26">len</span><span style="color: #000000">(passages) > </span><span style="color: #098658">5</span><span style="color: #000000">:</span></span>
<span class="line"><span style="color: #000000">    pass_text += </span><span style="color: #A31515">"本次抓取文章数大于5篇，根据AI推荐，推送五篇较有价值的文章。</span><span style="color: #EE0000">\n</span><span style="color: #A31515">"</span></span>
<span class="line cbp-no-blur"><span style="color: #000000">    push_index = getAIrecom(</span><span style="color: #001080">passage_list</span><span style="color: #000000">=passages)</span></span>
<span class="line"><span style="color: #000000">    </span><span style="color: #AF00DB">for</span><span style="color: #000000"> i </span><span style="color: #AF00DB">in</span><span style="color: #000000"> </span><span style="color: #795E26">range</span><span style="color: #000000">(</span><span style="color: #098658">5</span><span style="color: #000000">):</span></span>
<span class="line cbp-no-blur"><span style="color: #000000">        pass_text += </span><span style="color: #0000FF">f</span><span style="color: #A31515">"Title: </span><span style="color: #0000FF">{</span><span style="color: #000000">passages[</span><span style="color: #267F99">int</span><span style="color: #000000">(push_index[i])][</span><span style="color: #098658">1</span><span style="color: #000000">]</span><span style="color: #0000FF">}</span><span style="color: #A31515"> </span><span style="color: #EE0000">\n</span><span style="color: #A31515">URL: </span><span style="color: #0000FF">{</span><span style="color: #000000">passages[</span><span style="color: #267F99">int</span><span style="color: #000000">(push_index[i])][</span><span style="color: #098658">2</span><span style="color: #000000">]</span><span style="color: #0000FF">}</span><span style="color: #A31515"> </span><span style="color: #EE0000">\n</span><span style="color: #A31515">Brief: </span><span style="color: #0000FF">{</span><span style="color: #000000">aibrief(passages[</span><span style="color: #267F99">int</span><span style="color: #000000">(push_index[i])][</span><span style="color: #098658">4</span><span style="color: #000000">], passages[</span><span style="color: #267F99">int</span><span style="color: #000000">(push_index[i])][</span><span style="color: #098658">3</span><span style="color: #000000">])</span><span style="color: #0000FF">}</span><span style="color: #EE0000">\n\n</span><span style="color: #A31515">"</span></span>
<span class="line"><span style="color: #AF00DB">elif</span><span style="color: #000000"> </span><span style="color: #795E26">len</span><span style="color: #000000">(passages) == </span><span style="color: #098658">0</span><span style="color: #000000">:</span></span>
<span class="line"><span style="color: #000000">    </span><span style="color: #795E26">exit</span><span style="color: #000000">(</span><span style="color: #098658">0</span><span style="color: #000000">)</span></span>
<span class="line cbp-no-blur"><span style="color: #AF00DB">else</span><span style="color: #000000">:</span></span>
<span class="line"><span style="color: #000000">    </span><span style="color: #AF00DB">for</span><span style="color: #000000"> i </span><span style="color: #AF00DB">in</span><span style="color: #000000"> passages:</span></span>
<span class="line cbp-no-blur"><span style="color: #000000">        pass_text += </span><span style="color: #0000FF">f</span><span style="color: #A31515">"Title: </span><span style="color: #0000FF">{</span><span style="color: #000000">i[</span><span style="color: #098658">1</span><span style="color: #000000">]</span><span style="color: #0000FF">}</span><span style="color: #A31515"> </span><span style="color: #EE0000">\n</span><span style="color: #A31515">URL: </span><span style="color: #0000FF">{</span><span style="color: #000000">i[</span><span style="color: #098658">2</span><span style="color: #000000">]</span><span style="color: #0000FF">}</span><span style="color: #A31515"> </span><span style="color: #EE0000">\n</span><span style="color: #A31515">Brief: </span><span style="color: #0000FF">{</span><span style="color: #000000">aibrief(i[</span><span style="color: #098658">4</span><span style="color: #000000">], i[</span><span style="color: #098658">3</span><span style="color: #000000">])</span><span style="color: #0000FF">}</span><span style="color: #EE0000">\n\n</span><span style="color: #A31515">"</span></span>
```

</div>接下来对未读文章的数量进行判断，小于等于5篇就都推送，大于5篇就让AI判断哪些东西有价值再推送。`getAIrecom(passages)`的作用是将所有文章的内容发给AI让其判断，返回一个文章序号的列表。`aibrief(content, rsscontent)`的作用是根据爬取到的文章内容和rss里面的摘要生成一段AI摘要。

<div class="wp-block-kevinbatdorf-code-block-pro" data-code-block-pro-font-family="Code-Pro-JetBrains-Mono" style="font-size:clamp(14px, .875rem, 21px);font-family:Code-Pro-JetBrains-Mono,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;line-height:clamp(20px, 1.25rem, 30px);--cbp-tab-width:2;tab-size:var(--cbp-tab-width, 2)"><span style="display:flex;align-items:center;padding:10px 0px 0 16px;font-size:0.8em;width:100%;text-align:left;background-color:#FFFFFF;font-style:italic;color:#000000"><span style="border-bottom:1px solid rgba(0, 0, 0, 0.2)">Python</span></span><span aria-label="复制" class="code-block-pro-copy-button" role="button" style="color:#000000;display:none" tabindex="0">```
<textarea aria-hidden="true" class="code-block-pro-copy-button-textarea" readonly="readonly" tabindex="-1">def aibrief(content, rsscontent):
    client = OpenAI(
        api_key="sk-xxx",
        base_url="https://api.deepseek.com")

    response = client.chat.completions.create(
        model="deepseek-v4-flash",
        messages=[
            {"role": "system", "content": "你是一个专业的秘书，负责总结文章的内容，供网络安全协会的推送使用。请你根据给定的文章内容，生成一段不长于75字的摘要，概括文章的主要内容、思路、技术方法，供网络安全协会的成员快速判断是否对文章感兴趣。"},
            {"role": "user", "content": "trafilatura得到的文章内容，可能会因为反爬而为None或无意义字符" + str(content) + "\n 以下是订阅软件从 rss 中获取到的内容" + rsscontent}
        ],
        stream=False,
        reasoning_effort="high",
        extra_body={"thinking": {"type": "enabled"}}
    )

    return response.choices[0].message.content</textarea>
```

<svg fill="none" stroke="currentColor" stroke-width="2" style="width:24px;height:24px" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path class="with-check" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"></path><path class="without-check" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>```
<span class="line"><span style="color: #0000FF">def</span><span style="color: #000000"> </span><span style="color: #795E26">aibrief</span><span style="color: #000000">(</span><span style="color: #001080">content</span><span style="color: #000000">, </span><span style="color: #001080">rsscontent</span><span style="color: #000000">):</span></span>
<span class="line"><span style="color: #000000">    client = OpenAI(</span></span>
<span class="line"><span style="color: #000000">        </span><span style="color: #001080">api_key</span><span style="color: #000000">=</span><span style="color: #A31515">"sk-xxx"</span><span style="color: #000000">,</span></span>
<span class="line"><span style="color: #000000">        </span><span style="color: #001080">base_url</span><span style="color: #000000">=</span><span style="color: #A31515">"https://api.deepseek.com"</span><span style="color: #000000">)</span></span>
<span class="line"></span>
<span class="line"><span style="color: #000000">    response = client.chat.completions.create(</span></span>
<span class="line"><span style="color: #000000">        </span><span style="color: #001080">model</span><span style="color: #000000">=</span><span style="color: #A31515">"deepseek-v4-flash"</span><span style="color: #000000">,</span></span>
<span class="line"><span style="color: #000000">        </span><span style="color: #001080">messages</span><span style="color: #000000">=[</span></span>
<span class="line"><span style="color: #000000">            {</span><span style="color: #A31515">"role"</span><span style="color: #000000">: </span><span style="color: #A31515">"system"</span><span style="color: #000000">, </span><span style="color: #A31515">"content"</span><span style="color: #000000">: </span><span style="color: #A31515">"你是一个专业的秘书，负责总结文章的内容，供网络安全协会的推送使用。请你根据给定的文章内容，生成一段不长于75字的摘要，概括文章的主要内容、思路、技术方法，供网络安全协会的成员快速判断是否对文章感兴趣。"</span><span style="color: #000000">},</span></span>
<span class="line"><span style="color: #000000">            {</span><span style="color: #A31515">"role"</span><span style="color: #000000">: </span><span style="color: #A31515">"user"</span><span style="color: #000000">, </span><span style="color: #A31515">"content"</span><span style="color: #000000">: </span><span style="color: #A31515">"trafilatura得到的文章内容，可能会因为反爬而为None或无意义字符"</span><span style="color: #000000"> + </span><span style="color: #267F99">str</span><span style="color: #000000">(content) + </span><span style="color: #A31515">"</span><span style="color: #EE0000">\n</span><span style="color: #A31515"> 以下是订阅软件从 rss 中获取到的内容"</span><span style="color: #000000"> + rsscontent}</span></span>
<span class="line"><span style="color: #000000">        ],</span></span>
<span class="line"><span style="color: #000000">        </span><span style="color: #001080">stream</span><span style="color: #000000">=</span><span style="color: #0000FF">False</span><span style="color: #000000">,</span></span>
<span class="line"><span style="color: #000000">        </span><span style="color: #001080">reasoning_effort</span><span style="color: #000000">=</span><span style="color: #A31515">"high"</span><span style="color: #000000">,</span></span>
<span class="line"><span style="color: #000000">        </span><span style="color: #001080">extra_body</span><span style="color: #000000">={</span><span style="color: #A31515">"thinking"</span><span style="color: #000000">: {</span><span style="color: #A31515">"type"</span><span style="color: #000000">: </span><span style="color: #A31515">"enabled"</span><span style="color: #000000">}}</span></span>
<span class="line"><span style="color: #000000">    )</span></span>
<span class="line"></span>
<span class="line"><span style="color: #000000">    </span><span style="color: #AF00DB">return</span><span style="color: #000000"> response.choices[</span><span style="color: #098658">0</span><span style="color: #000000">].message.content</span></span>
```

</div><div class="wp-block-kevinbatdorf-code-block-pro" data-code-block-pro-font-family="Code-Pro-JetBrains-Mono" style="font-size:clamp(14px, .875rem, 21px);font-family:Code-Pro-JetBrains-Mono,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;line-height:clamp(20px, 1.25rem, 30px);--cbp-tab-width:2;tab-size:var(--cbp-tab-width, 2)"><span style="display:flex;align-items:center;padding:10px 0px 0 16px;font-size:0.8em;width:100%;text-align:left;background-color:#FFFFFF;font-style:italic;color:#000000"><span style="border-bottom:1px solid rgba(0, 0, 0, 0.2)">Python</span></span><span aria-label="复制" class="code-block-pro-copy-button" role="button" style="color:#000000;display:none" tabindex="0">```
<textarea aria-hidden="true" class="code-block-pro-copy-button-textarea" readonly="readonly" tabindex="-1">def getAIrecom(passage_list) -> list:
    client = OpenAI(
        api_key="sk-xxx",
        base_url="https://api.deepseek.com")
    
    toEvaluateContent = ""
    index = 0
    for i in passage_list:
        toEvaluateContent += f"第{index}篇文章：\n标题：{i[1]}\nRSS摘要：{i[3]}\n网页摘要：{i[4]}\n\n"
        index += 1

    response = client.chat.completions.create(
        model="deepseek-v4-flash",
        messages=[
            {"role": "system", "content": "你是一个专业的秘书，负责筛选有价值的文章，供网络安全协会的推送使用。请你根据给定的文章内容，回答出其中最有价值的五篇文章的序号，序号之间用空格分隔，不要有多余内容。文章的价值从重要性和影响力来评估。因为反爬的原因，有一些文章的网页内容可能为None或无意义内容，请忽视这一点，根据RSS摘要来做判断。"},
            {"role": "user", "content": toEvaluateContent}
        ],
        stream=False,
        reasoning_effort="xhigh",
        extra_body={"thinking": {"type": "enabled"}}
    )

    return str(response.choices[0].message.content).split()</textarea>
```

<svg fill="none" stroke="currentColor" stroke-width="2" style="width:24px;height:24px" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path class="with-check" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"></path><path class="without-check" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>```
<span class="line"><span style="color: #0000FF">def</span><span style="color: #000000"> </span><span style="color: #795E26">getAIrecom</span><span style="color: #000000">(</span><span style="color: #001080">passage_list</span><span style="color: #000000">) -> </span><span style="color: #267F99">list</span><span style="color: #000000">:</span></span>
<span class="line"><span style="color: #000000">    client = OpenAI(</span></span>
<span class="line"><span style="color: #000000">        </span><span style="color: #001080">api_key</span><span style="color: #000000">=</span><span style="color: #A31515">"sk-xxx"</span><span style="color: #000000">,</span></span>
<span class="line"><span style="color: #000000">        </span><span style="color: #001080">base_url</span><span style="color: #000000">=</span><span style="color: #A31515">"https://api.deepseek.com"</span><span style="color: #000000">)</span></span>
<span class="line"><span style="color: #000000">    </span></span>
<span class="line"><span style="color: #000000">    toEvaluateContent = </span><span style="color: #A31515">""</span></span>
<span class="line"><span style="color: #000000">    index = </span><span style="color: #098658">0</span></span>
<span class="line"><span style="color: #000000">    </span><span style="color: #AF00DB">for</span><span style="color: #000000"> i </span><span style="color: #AF00DB">in</span><span style="color: #000000"> passage_list:</span></span>
<span class="line"><span style="color: #000000">        toEvaluateContent += </span><span style="color: #0000FF">f</span><span style="color: #A31515">"第</span><span style="color: #0000FF">{</span><span style="color: #000000">index</span><span style="color: #0000FF">}</span><span style="color: #A31515">篇文章：</span><span style="color: #EE0000">\n</span><span style="color: #A31515">标题：</span><span style="color: #0000FF">{</span><span style="color: #000000">i[</span><span style="color: #098658">1</span><span style="color: #000000">]</span><span style="color: #0000FF">}</span><span style="color: #EE0000">\n</span><span style="color: #A31515">RSS摘要：</span><span style="color: #0000FF">{</span><span style="color: #000000">i[</span><span style="color: #098658">3</span><span style="color: #000000">]</span><span style="color: #0000FF">}</span><span style="color: #EE0000">\n</span><span style="color: #A31515">网页摘要：</span><span style="color: #0000FF">{</span><span style="color: #000000">i[</span><span style="color: #098658">4</span><span style="color: #000000">]</span><span style="color: #0000FF">}</span><span style="color: #EE0000">\n\n</span><span style="color: #A31515">"</span></span>
<span class="line"><span style="color: #000000">        index += </span><span style="color: #098658">1</span></span>
<span class="line"></span>
<span class="line"><span style="color: #000000">    response = client.chat.completions.create(</span></span>
<span class="line"><span style="color: #000000">        </span><span style="color: #001080">model</span><span style="color: #000000">=</span><span style="color: #A31515">"deepseek-v4-flash"</span><span style="color: #000000">,</span></span>
<span class="line"><span style="color: #000000">        </span><span style="color: #001080">messages</span><span style="color: #000000">=[</span></span>
<span class="line"><span style="color: #000000">            {</span><span style="color: #A31515">"role"</span><span style="color: #000000">: </span><span style="color: #A31515">"system"</span><span style="color: #000000">, </span><span style="color: #A31515">"content"</span><span style="color: #000000">: </span><span style="color: #A31515">"你是一个专业的秘书，负责筛选有价值的文章，供网络安全协会的推送使用。请你根据给定的文章内容，回答出其中最有价值的五篇文章的序号，序号之间用空格分隔，不要有多余内容。文章的价值从重要性和影响力来评估。因为反爬的原因，有一些文章的网页内容可能为None或无意义内容，请忽视这一点，根据RSS摘要来做判断。"</span><span style="color: #000000">},</span></span>
<span class="line"><span style="color: #000000">            {</span><span style="color: #A31515">"role"</span><span style="color: #000000">: </span><span style="color: #A31515">"user"</span><span style="color: #000000">, </span><span style="color: #A31515">"content"</span><span style="color: #000000">: toEvaluateContent}</span></span>
<span class="line"><span style="color: #000000">        ],</span></span>
<span class="line"><span style="color: #000000">        </span><span style="color: #001080">stream</span><span style="color: #000000">=</span><span style="color: #0000FF">False</span><span style="color: #000000">,</span></span>
<span class="line"><span style="color: #000000">        </span><span style="color: #001080">reasoning_effort</span><span style="color: #000000">=</span><span style="color: #A31515">"xhigh"</span><span style="color: #000000">,</span></span>
<span class="line"><span style="color: #000000">        </span><span style="color: #001080">extra_body</span><span style="color: #000000">={</span><span style="color: #A31515">"thinking"</span><span style="color: #000000">: {</span><span style="color: #A31515">"type"</span><span style="color: #000000">: </span><span style="color: #A31515">"enabled"</span><span style="color: #000000">}}</span></span>
<span class="line"><span style="color: #000000">    )</span></span>
<span class="line"></span>
<span class="line"><span style="color: #000000">    </span><span style="color: #AF00DB">return</span><span style="color: #000000"> </span><span style="color: #267F99">str</span><span style="color: #000000">(response.choices[</span><span style="color: #098658">0</span><span style="color: #000000">].message.content).split()</span></span>
```

</div>我原本不太熟悉类型怎么限定的，但之前好像看过写这种限定的代码，在这里加`-> list`的原因是前面代码用这个函数返回值的地方静态判断会报错。

Napcat有HTTP接口可以发送群消息，弄好要推送的文章和摘要之后调用接口发群消息即可。

<div class="wp-block-kevinbatdorf-code-block-pro" data-code-block-pro-font-family="Code-Pro-JetBrains-Mono" style="font-size:clamp(14px, .875rem, 21px);font-family:Code-Pro-JetBrains-Mono,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;line-height:clamp(20px, 1.25rem, 30px);--cbp-tab-width:2;tab-size:var(--cbp-tab-width, 2)"><span style="display:flex;align-items:center;padding:10px 0px 0 16px;font-size:0.8em;width:100%;text-align:left;background-color:#FFFFFF;font-style:italic;color:#000000"><span style="border-bottom:1px solid rgba(0, 0, 0, 0.2)">Python</span></span><span aria-label="复制" class="code-block-pro-copy-button" role="button" style="color:#000000;display:none" tabindex="0">```
<textarea aria-hidden="true" class="code-block-pro-copy-button-textarea" readonly="readonly" tabindex="-1">token = "xxx"
url = "http://xxx/send_group_msg"

headers = {'User-Agent': 'Mozilla/5.0', 'Authorization': f"Bearer {token}"}

data = {"group_id": xxx, "message": f"最近几小时爬取到了{len(passages)}篇文章，信息如下：\n{pass_text}\n各位成员可以在 xxx 查看所有文章。"}

x = requests.post(url, headers=headers, data=data)

print(x.text)</textarea>
```

<svg fill="none" stroke="currentColor" stroke-width="2" style="width:24px;height:24px" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path class="with-check" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" stroke-linecap="round" stroke-linejoin="round"></path><path class="without-check" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>```
<span class="line"><span style="color: #000000">token = </span><span style="color: #A31515">"xxx"</span></span>
<span class="line"><span style="color: #000000">url = </span><span style="color: #A31515">"http://xxx/send_group_msg"</span></span>
<span class="line"></span>
<span class="line"><span style="color: #000000">headers = {</span><span style="color: #A31515">'User-Agent'</span><span style="color: #000000">: </span><span style="color: #A31515">'Mozilla/5.0'</span><span style="color: #000000">, </span><span style="color: #A31515">'Authorization'</span><span style="color: #000000">: </span><span style="color: #0000FF">f</span><span style="color: #A31515">"Bearer </span><span style="color: #0000FF">{</span><span style="color: #000000">token</span><span style="color: #0000FF">}</span><span style="color: #A31515">"</span><span style="color: #000000">}</span></span>
<span class="line"></span>
<span class="line"><span style="color: #000000">data = {</span><span style="color: #A31515">"group_id"</span><span style="color: #000000">: xxx, </span><span style="color: #A31515">"message"</span><span style="color: #000000">: </span><span style="color: #0000FF">f</span><span style="color: #A31515">"最近几小时爬取到了</span><span style="color: #0000FF">{</span><span style="color: #795E26">len</span><span style="color: #000000">(passages)</span><span style="color: #0000FF">}</span><span style="color: #A31515">篇文章，信息如下：</span><span style="color: #EE0000">\n</span><span style="color: #0000FF">{</span><span style="color: #000000">pass_text</span><span style="color: #0000FF">}</span><span style="color: #EE0000">\n</span><span style="color: #A31515">各位成员可以在 xxx 查看所有文章。"</span><span style="color: #000000">}</span></span>
<span class="line"></span>
<span class="line"><span style="color: #000000">x = requests.post(url, </span><span style="color: #001080">headers</span><span style="color: #000000">=headers, </span><span style="color: #001080">data</span><span style="color: #000000">=data)</span></span>
<span class="line"></span>
<span class="line"><span style="color: #795E26">print</span><span style="color: #000000">(x.text)</span></span>
```

</div>小脚本的完整代码：[XDSec Push Bot](https://gist.github.com/Xiaozonglin/84b45bb44dd87563ff53aa373aa2b2d8)
---
title: 小东西：用FreshRSS实现带AI摘要的订阅推送
date: '2026-05-10T12:38:40+08:00'
authors: 林林
slug: /xdsec-push-bot/
categories:
    - 开发
tags:
    - Python
---

前几天在协会问了一下有没有什么开发任务，然后找了一个开发订阅推送的活。

![](/wp-content/uploads/2026/05/image.png)

聊天记录（昵称和头像已用白色遮罩）

工具需要实现的功能是：定时爬取一些安全newsletter和博客的订阅源，并将爬取到的文章推送到协会的QQ群，要有AI的摘要。

| 模块 | 任务 |
|---|---|
| FreshRSS | 爬取、存储内容 |
| Napcat | 部署QQ机器人 |
| Python | 脚本对接AI、FreshRSS和Napcat |

![](/wp-content/uploads/2026/05/image-1-1024x106.png)

流程图

FreshRSS我用Docker方式部署，在应用中开放接口登录并设置一下API密钥，原本打算自己看着接口文档搞的，结果一搜发现Python有对应的接口库[freshrss-api](https://pypi.org/project/freshrss-api/)，直接就拿来用了。

```python
from freshrss_api import FreshRSSAPI
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
    client.set_mark(as_="read", id=i.id)
```

思路大概是这样，每次推送的时候都从未读的文章里面取，取出来就把文章设置为已读。

在获取到还未推送的文章（未读文章）之后，接着需要爬取文章的内容，供后面AI推荐和生成摘要使用。此处使用的是trafilatura库（[星火杯参赛小记](/spark-bei-participate-small-ji/) 用过的），可以将网页内容清洗成Markdown。因为遇到反爬时可能会返回None，导致后面字符串拼接时可能报错，所以对清洗出的结果用`str( )`进行强制转换。

```python
if len(passages) > 5:
    pass_text += "本次抓取文章数大于5篇，根据AI推荐，推送五篇较有价值的文章。\n"
    push_index = getAIrecom(passage_list=passages)
    for i in range(5):
        pass_text += f"Title: {passages[int(push_index[i])][1]} \nURL: {passages[int(push_index[i])][2]} \nBrief: {aibrief(passages[int(push_index[i])][4], passages[int(push_index[i])][3])}\n\n"
elif len(passages) == 0:
    exit(0)
else:
    for i in passages:
        pass_text += f"Title: {i[1]} \nURL: {i[2]} \nBrief: {aibrief(i[4], i[3])}\n\n"
```

接下来对未读文章的数量进行判断，小于等于5篇就都推送，大于5篇就让AI判断哪些东西有价值再推送。`getAIrecom(passages)`的作用是将所有文章的内容发给AI让其判断，返回一个文章序号的列表。`aibrief(content, rsscontent)`的作用是根据爬取到的文章内容和rss里面的摘要生成一段AI摘要。

```python
def aibrief(content, rsscontent):
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

    return response.choices[0].message.content
```

我原本不太熟悉类型怎么限定的，但之前好像看过写这种限定的代码，在这里加`-> list`的原因是前面代码用这个函数返回值的地方静态判断会报错。

Napcat有HTTP接口可以发送群消息，弄好要推送的文章和摘要之后调用接口发群消息即可。

```python
token = "xxx"
url = "http://xxx/send_group_msg"

headers = {'User-Agent': 'Mozilla/5.0', 'Authorization': f"Bearer {token}"}

data = {"group_id": xxx, "message": f"最近几小时爬取到了{len(passages)}篇文章，信息如下：\n{pass_text}\n各位成员可以在 xxx 查看所有文章。"}

x = requests.post(url, headers=headers, data=data)

print(x.text)
```

小脚本的完整代码：[XDSec Push Bot](https://gist.github.com/Xiaozonglin/84b45bb44dd87563ff53aa373aa2b2d8)
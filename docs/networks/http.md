# 应用层HTTP协议

```
scheme://[userinfo@passwd]host[:port]/path[?query][#fragment]
```

## 数据包

HTTP数据包分为请求包和响应包。

### 请求包

请求由三部分组成：请求行、消息报头、请求正文

请求行以一个方法符号开头，以空格分开，后面跟着请求的URI和协议的版本，格式如下：

```
Method Request-URI HTTP-Version CRLF
```

其中 Method表示请求方法；Request-URI是一个统一资源标识符；HTTP-Version表示请求的HTTP协议版本；CRLF表示回车和换行（除了作为结尾的CRLF外，不允许出现单独的CR或LF字符,要出现的话以编码后出现）。

```http
GET /directory HTTP/1.1
Host: join.xdsec.xiaozonglin.cn
Accept-Encoding: gzip, deflate, br
Accept: */*
Accept-Language: en-US;q=0.9,en;q=0.8
User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36
Cache-Control: max-age=0
```

### 响应包

HTTP响应也是由三个部分组成，分别是：状态行、消息报头、响应正文。

状态行格式如下：

```
HTTP-Version Status-Code Reason-Phrase \r\n
```

```http
HTTP/1.1 200 OK
Content-Type: text/html
Connection: keep-alive
x-content-type-options: nosniff
x-xss-protection: 1; mode=block
x-frame-options: SAMEORIGIN
referrer-policy: same-origin
expect-ct: max-age=86400, enforce
Date: Sun, 13 Sep 2026 08:16:46 GMT
Content-MD5: WRy1v7br56JxMKouzohFyQ==
ETag: "591CB5BFB6EBE7A27130AA2ECE8845C9"
Last-Modified: Sat, 12 Sep 2026 12:02:24 GMT
Content-Length: 601

<!doctype html>
<html lang="zh-CN">
  <head>
  ...
```
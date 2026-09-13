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
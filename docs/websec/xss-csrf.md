# XSS与CSRF

## xss

本质就是浏览器执行js代码

```html
<script src="http://example.com/evil.js">alert(1)</script>
```

```html
<a href="javascript:alert('xss')">xss</a>
```

```html
<body onload="alert('xss')"></body>
```

```html
<img src=x onerror="alert('xss')">
```

`alert()`提示框

`confirm()`确认框

`prompt()`输入框

```javascript
var pwd = prompt('enter your passwd');
```

事件：

鼠标事件：

- onclick点击元素
- onload加载完成
- onerror加载失败
- oncontextmenu右键点击
- onmousedown鼠标按下
- onmouseover鼠标移到元素上

键盘事件：

- onkeydown按键按下
- onkeyup按键松开

绕过：

- 多事件组合触发

## CSRF

“借刀杀人”，利用用户在已登录状态下的身份凭证，发起非用户本意请求的攻击方式。

如何检测CSRF

防护

- 前端：同源策略校验、敏感操作二次验证、规范请求方法
- 后端：CSRF Token校验、SameSite Cookie属性、请求头来源验证
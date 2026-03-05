---
sidebar_position: 1
---

# PHP 相关笔记

## PHP伪协议

[ctf必须知道的php伪协议总结 - 知乎](https://zhuanlan.zhihu.com/p/686151790)

![php://input](https://www.xiaozonglin.cn/wp-content/uploads/2026/02/屏幕截图-2026-02-22-184155.png)

`php://input`：可以访问请求的原始数据的只读流，在 POST 请求中访问 POST 的 data 部分，在 enctype="multipart/form-data" 的时候 php://input 是无效的。

## md5算法

```php
<?php
	$flag="";
	$v1=$_GET['v1'];
	$v2=$_GET['v2'];
	if(isset($v1) && isset($v2)){
		if(!ctype_alpha($v1)){die("v1 error");}
		if(!is_numeric($v2)){die("v2 error");}
		if(md5($v1)==md5($v2)){echo $flag;}
	}else{echo "where is flag?";}
?>
```
当一串字母和一个数字计算出的 md5 值不严格相等就可以得到 flag。利用 PHP 中`0e`开头的 md5 值会被解释为科学计数法（0 的任意次方均为 0）的特性，可以构造如下参数：

- `v1=QNKCDZO`（纯字母，其 md5 值为 `0e830400451993494058024219903391`）
- `v2=240610708`（纯数字，其 md5 值为 `0e462097431906509019562988736854`）

这两个 md5 值都以`0e`开头且后面全是数字，因此`md5($v1) == md5($v2)`成立，从而输出`$flag`。

[MD5 在线碰撞 - 百川在线工具箱](https://rivers.chaitin.cn/tools/md5fastcollision)
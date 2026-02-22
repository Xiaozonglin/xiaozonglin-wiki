---
sidebar_position: 1
---

# PHP 相关笔记

## PHP伪协议

https://zhuanlan.zhihu.com/p/686151790

![php://input](https://www.xiaozonglin.cn/wp-content/uploads/2026/02/屏幕截图-2026-02-22-184155.png)

`php://input`：可以访问请求的原始数据的只读流，在 POST 请求中访问 POST 的 data 部分，在 enctype="multipart/form-data" 的时候 php://input 是无效的。
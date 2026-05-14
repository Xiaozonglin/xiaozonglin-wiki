---
sidebar_position: 3
---
# 其他语句

## with语句

```python
with open('example.txt', 'r') as file:  
    content = file.read()  
    print(content)  
# 文件已自动关闭
```
等价于

```python
file = open('example.txt', 'r')  
try:  
    content = file.read()  
    # 处理文件内容  
finally:  
    file.close()
```
不过用`with`语句更优雅，在处理支持上下文管理协议的对象（文件访问、数据库访问）等可以自动释放资源。
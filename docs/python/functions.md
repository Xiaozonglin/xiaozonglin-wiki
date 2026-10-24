# 函数

`nonlocal`：嵌套函数要修改外层函数的变量，需要使用`nonlocal`关键字

```python
def test(num):
	in_num = num
	
	def nested(label):
		nonlocal in_num
		in_num += 1
		print(label, in_num)
	
	return nested
```
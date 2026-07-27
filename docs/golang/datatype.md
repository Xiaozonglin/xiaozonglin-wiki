---
sidebar_position: 2
---
# 数据类型

## 函数

```go golang
func swap(x, y string) (string, string) {
	return y, x
}

func main() {
	a, b := swap("www", "aaa")
}
```
函数在默认情况下使用值传递，参数被拷贝了一份传进函数，不会影响原本的参数值。当使用引用传递时则会影响原来的值，类似于C中的指针。

函数可以作为参数传递，一个有点像是嵌套，例如`fmt.Println(getSquareRoot(9))`。当函数作为实参传入时需要指定好类型参数。
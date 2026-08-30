# 向量

向量有两种创建方法。

```rust
let mut v1 = std::vec::Vec::new();
v1.push(String::from("one"));

let mut v2 = vec![1, 2, 3];
v2.push(4);
```
可以用跟列表一样的索引方法进行索引，也可以用get，方法返回Option枚举实例。
```rust
let s = v1.get(0);
if let Some(x) = s {
	println!("{}", x);
}
```
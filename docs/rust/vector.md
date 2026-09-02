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

向量要求每一个元素的数据类型都相同，可以用枚举来帮助用向量存储不同类型的数据。比如如果我们要在一个向量中存储i32和f32的数据，则可以创建一个枚举。

```rust
enum SpreadsheetCell {
        Int(i32),
        Float(f32)
}
```

此时每个枚举元素都将视为同一个数据类型。
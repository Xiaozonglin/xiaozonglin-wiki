# OBRM与内存管理
原则：
- Each value in Rust has a variable that's called its owner.
- There can be only one owner at a time.
- When the owner goes out of the scope, the value will be dropped.

## 在变量赋值的情况

所有权会发生转移。
```rust
let s1 = String::from("example"); // 这个字符串存储在堆上
let s2 = s1; // s1的内容所有权已经转移给s2
println!("s1 is {s1}"); // 会报错
```
如果需要让s1能打印出来，可以让s2克隆s1。
```rust
let s1 = String::from("example");
let s2 = s1.clone(); // 将s1的内容克隆一份给s2
println!("s1 is {s1}"); // 不会报错
```


存储在栈上的变量会默认clone（例如数字、布尔值等），例如：
```rust
let x = 10;
let y = x; // 默认克隆
println!("x is {x}"); // 不会报错
```

## 在函数进出传递中的情况

将变量传递到函数当中与赋值有相同的效果，也就是把所有权转移给形参。形参在函数执行的末尾会被删除。

后面也可以用借用来解决这个问题。
```rust
print_string(s1.clone()); // 可以这样避免s1的所有权被转移
let s2 = generate_string(); // 函数返回值的所有权被转移到s2
```

存储在栈内存上的变量情况与上一个情况类似，会clone。

## 借用

为什么要借用：

- 更经济，不需要克隆。
- 调用不需要转移所有权的函数。

为了避免数据竞争（Data Races）和悬空引用（Dangling Reference），借用遵循两条规则：

- 只能有一个可变的引用，或无数个不可变的引用。
- 引用必须有效。

```rust
let r1 = &s1;
print_string(r1);
println!("s1 is {}", s1); // s1仍然有效
```

除了克隆和引用之外，还可以用shadowing来解决这个问题，但是看起来有点奇怪，而且效率不高。
```rust
let s1 = add_to_string(s1);
```
所以当调用需要修改内容的函数时，可以用可变引用。可变变量才能创建可变引用。
```rust
let r2 = &mut s1; // 可变引用
add_to_string(r2);
```
如果此时触犯第一条原则，我们需要调整引用使用的顺序。
```rust
let r1 = &s1; // 一个不可变引用
let r2 = &mut s1; // 无法创建可变引用
print_string(r1);
add_to_string(r2);
```
```rust
let r1 = &s1; // 一个不可变引用
print_string(r1);
let r2 = &mut s1; // 此时可以创建可变引用，因为不可变引用被删除了
add_to_string(r2);
```

解引用运算符是`*`，Rust有自动解引用的机制。
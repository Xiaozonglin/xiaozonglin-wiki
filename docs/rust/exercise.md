# 训练

```rust
fn main() {
	// 定义一个元组，包含：你的年龄（u8）、身高（f32）、是否学生（bool）
	// 然后使用模式匹配解构出这三个值，并打印
	let a: (u8, f32, bool) = (18, 160.0, true);
	let (age, height, is_student) = a;
	println!("{age} {height} {is_student}");
}
```

```rust
fn main() {
	let s1 = String::from("Rust");
	let s2 = s1.clone();
	println!("{}", s1);
	// 任务：请你打印 s2，并且在不重新赋值 s1 的情况下，让下面这行代码能工作
	let s3 = s1;
}
```

```rust
fn main() {
let s = String::from("ownership");
take_ownership(s);
// 现在 s 还能用吗？为什么？
// 不能，s的所有权被h转移给str,str在函数h执行完毕后删除

let x = 10;
make_copy(x);
// x 还能用吗？
// 还能用，因为h数字存在栈上，默认复制
}

fn take_ownership(str: String) {
println!("{}", str);
}

fn make_copy(num: i32) {
println!("{}", num);
}
```

```rust
fn main() {
    let mut s = String::from("hello");
    // 任务：创建对 s 的一个不可变引用和一个可变引用
    // 但必须保证编译通过（注意引用的作用域）
    {
	    let r1 = &s;
	    let r2 = &s;
    }
    let r3 = &mut s;
    // 请调整代码顺序，使得能同时使用不可变引用和可变引用
    // （提示：作用域结束）
}
```

```rust
fn main() {
    let reference_to_nothing = dangle();
}
fn dangle() -> String {
    let s = String::from("hello");
    s
}
```

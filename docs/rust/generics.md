# 泛型

```rust
struct command<T> {
	name: String,
	payload: T
}

impl<T> command<T> {
	fn new(name: String, payload: T) -> Self {
		command {
			name: name,
			payload: payload
		}
	}
}

let command1 = command::new("navigation".to_owned(), "http://foo.example".to_owned());
```

使用泛型没有运行时开销，因为Rust在编译过程中会进行“单态化”，将泛型函数（结构体、枚举等）编译成多个函数（结构体、枚举等）。
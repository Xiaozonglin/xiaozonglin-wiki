# 元组、列表、结构体、枚举与`impl`

### 元组

```rust
let tup = (500, 6.4, 1); // 元组的值类型可以不同
let (x, y, z) = tup;
```
元组使用`tup.1`来索引第二个元素
## 列表

```rust
let a = [1, 2, 3, 4, 5];
```

数组使用`a[1]`来索引第二个元素

## 结构体与`impl`

```rust
struct Product {
	name: String,
	price: f32
}

fn main() {
	let book: Product = Product {
		name: String::from("book"),
		price: 15.0
	};
	println!("{}", book.name);
}
```

我们可以写一些结构体的函数。

```rust
fn get_product_price(product: &Product) -> f32 {
	product.price
}
```

单独弄成函数没法体现出函数和结构体的关联关系，所以可以用`impl`来做这件事。

```rust
fn main() {
	let mut book = Product::new(String::from("book"), 13.0);
	println!("{}", book.get_product_price());
	book.set_product_price(19.0);
	println!("{}", book.get_product_price());
}

impl Product {
	fn new(name: String, price: f32) -> Product {
		Product {
			name: name,
			price: price
		}
	}
	fn get_product_price(&self) -> f32 {
		self.price
	}
	fn set_product_price(&mut self, price: f32) {
		self.price = price;
	}
}
```

### 元组结构体

```rust
struct Color(i32, i32, i32);
let red: Color = Color(255, 0, 0);
```

### Unit-like Struct

```rust
struct UnitLikeStruct;
```
这种特殊的结构体没有任何字段，在只需要将一些方法集合到一起，且不需要存储任何数据时使用。

## 枚举

```rust
enum Color {
	Red,
	Green,
	Yellow
}
```

```rust
enum Calculate {
	Plus {
		a: i32,
		b: i32,
	},
	Minus(i32, i32)
}

let plus = Calculate::Plus { a: 1, b: 2 };
```

与此同时，`enum`可以用`impl`实现一些方法。
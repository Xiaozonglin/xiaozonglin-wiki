# 软件测试

Rust测试的习惯是将测试代码和模块代码内联在一起，或者也可以分离到一个文件夹中。

## 单元测试

单元测试是为了测试小的代码单元。

写单元测试的用例肉眼可见的累。

```rust
pub fn add(left: u64, right: u64) -> u64 {
	left + right
}

#[cfg(test)]
mod tests {
	use super::*;
	
	#[test]
	fn it_works() {
		let result = add(2, 2);
		assert_eq!(result, 4);
	}
}
```

## 集成测试

集成测试在代码外部进行，仅测试公共接口，为了测试多个代码单元之间的交互。

集成测试文件存在于`src`同级的`tests`文件夹中。

## 文档说明

简单说明、示例（将被视为Doc-test测试代码编译，有断言）、错误处理。

可以使用`cargo doc`生成文档。

## 基准测试

使用基准测试可帮助防止性能敏感代码出现倒退。
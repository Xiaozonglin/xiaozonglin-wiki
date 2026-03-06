---
sidebar_position: 2
---
# 流程控制

## `continue`与`break`

`break`语句将跳出最近的一层循环。（只会跳出一层）

原本看`continue`不是继续吗，感觉没什么用，结果是：`continue`会执行循环的下一轮迭代，跳出本轮迭代。

Deepseek就此举了一个例子，我感觉还行，摘到这里。

1. `continue`（继续）：跳过当前，进入下一轮
	- 你正在吃第 3 个包子，咬了一口发现里面有根头发。
    - 你把这一个包子放下（跳出本次循环），直接拿起第 4 个包子开始吃（进入下一次循环）。
    - 循环的总次数（包子总数）没变，只是跳过了这一次糟糕的经历。
2. `break`（中断）：彻底结束
    - 你正在吃第 5 个包子，咬了一口发现已经吃饱了，再也吃不下了。
    - 你直接把筷子放下（彻底跳出循环），后面的第 6、7、8 个包子你都不会再去碰了。
    - 循环在此终止。

## 循环的`else`语句

跟和`if`搭配的`else`不同，跟`for`搭配的`else`语句是这样的：如果循环在未执行`break`的情况下结束，`else` 子句将会执行。具体对于两种循环是这样的：

- `if`语句：执行完最后一次迭代后执行（也就是没有执行`break`）
- `while`语句：在循环条件变为假的时候执行

## `pass`语句

这个语句没有任何意思，用来占位，让开发者可以保持更抽象的层次思考，暂时不用具体实现。

## `match`语句

看起来像别的语言中的`switch ... case ...`，只有第一个匹配的模式会被执行。我尝试用两段代码来告诉我自己关于这个语句的一些东西。

```python
# Assume `so` is a tuple containing two strings
match so:
    case ("male", "female") | ("female", "male"):
        print("Heterosexual")
    case (x, y):
        print(f"You are a {x}, and you love {y} too. So you are homosexual.")
```
- `|`可以用来并列多个字面值
- `case`可以进行绑定

上面的代码还可以用守卫子句写成这样：

```python
match so:
    case (x, y) if x != y:
        print("Heterosexual")
    case (x, y) if x == y:
        print(f"You are a {x}, and you love {y} too. So you are homosexual.")
```
如果守卫子句的值为假，那么 `match` 会继续尝试匹配下一个 case 块。注意是先将值捕获，再对守卫子句求值。

## Lambda 表达式

`lambda 参数: 表达式`，that's all.
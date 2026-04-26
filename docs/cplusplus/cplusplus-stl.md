---
sidebar_position: 3
---
# C++ STL

## 迭代器
‘
指向某个`container`中元素的迭代器的类型一般为`container::iterator`。

使用迭代器遍历元素：

```c++
for (vector<int>::iterator iter = data.begin(); iter != data.end(); iter++){
	cout << *iter << endl; // 解引用
}
```
C++中的`引用`是不需要解引用的，这里的迭代器更像是指针，`iter`变量本身存的是一个内存地址。

可以使用`auto`来简化代码：

```c++
for (auto iter = data.begin(); iter != data.end(); iter++){
	cout << *iter << endl;
}
```

## vector容器（动态数组）

```c++
#include <vector>

std::vector<int> myVector;

myVector.push_back(7); // 加到末尾

int x = myVector[0]; // 获取第一个元素
int y = myVector.at(1); // 获取第二个元素

int size = myVector.size(); // 获取元素数量

myVector.erase(myVector.begin() + 2); // 删除第三个元素

myVector.clear(); // 清空 vector
```
遍历方法：
```c++
for (auto it = myVector.begin(); it != myVector.end(); ++it) {
    std::cout << *it << " ";
}
```
## array（也是数组）

## list（链表）

```c++
#include <list>

std::list<int> lst; // 创建列表
```
列表支持进行以下操作：

| 方法                   | 用途           |
| -------------------- | ------------ |
| `push_back(val)`     | 在末尾添加元素      |
| `push_front(val)`    | 在头部添加元素      |
| `pop_back()`         |              |
| `pop_front()`        |              |
| `insert(pos, val)`   | 在指定位置插入      |
| `erase(pos)`         | 删除指定位置元素     |
| `clear()`            |              |
| `size()`             | 元素数量         |
| `empty()`            | 判断是否为空       |
| `front()`            |              |
| `back()`             |              |
| `remove(val)`        | 删除所有等于指定值的元素 |
| `sort()`             | 对链表进行排序      |
| `merge(list& other)` | 合并另一个已排序的链表  |
| `reverse()`          | 反转链表         |
| `begin()`/ `end()`   | 链表的起始/结束迭代器  |

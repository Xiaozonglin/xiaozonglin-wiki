---
sidebar_position: 1
---
# 指针与引用

```c++
int a = 10;
int* p = &a; // 这是一个指针

int a = 10;
int &ref = a; // 这是一个引用
```
- 引用不能为空
- 引用只能指向一个变量
- 不能有引用的引用
- 引用可以直接使用（当变量名使用），无需解引用运算符

## RAII 智能指针

手动管理堆内存（heap）会出现一些问题，比如所有权模糊、重复释放或内存泄漏（memory leak）。C++的智能指针在让程序员手动管理内存的同时降低了因内存出错的可能性。

```c++
int manual_example() {
	Car* car = new Car;
	some_function_that_can_throw_error();
	if (!isContinue()) { return 0; }
	delete car;
	return 0;
}
```
在上面的这个例子中，如果第三行的函数调用返回错误，或者第四行提前return，则后面car内存将不会释放，造成内存泄漏。
RAII的R指资源（Resource），不仅仅包含内存，还包含网络嵌套字、文件句柄等等。这些资源在使用后需要手动释放，同样容易出错。

所以，我们可以用一个`CarManager`来管理car。
```c++
class CarManager {
private:
	car* p;
public:
	CarManager(car* p) : p(p) {}
	~CarManager() {
		delete p;
	}
}

int manual_example() {
	CarManger* car = CarManager(new Car);
	some_function_that_can_throw_error();
	if (!isContinue()) { return 0; }
	return 0;
}
```
由于这里的`CarManager`没有用new，所以存在栈内存上（Stack Memory），由程序自动管理，当超出作用域的时候自动回收CarManager，然后再由CarManager回收car。。

C++中有类似的智能指针机制。
### unique-ptr
```c++
int function_example() {
	unique_ptr<Car> car = make_unique<car>();
	some_function_that_can_throw_error();
	if (!isContinue()) { return 0; }
}
```

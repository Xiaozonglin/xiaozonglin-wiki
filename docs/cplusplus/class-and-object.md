---
sidebar_position: 2
---
# 面向对象编程

```c++
#include <iostream>
#include <cstring>

using namespace std;

int main() {
	class student {
		public:
			string name;
			int getAge() {
				return age;
			}
			void setAge(int i) {
				age = i;
			}
		private:
			int age;
	};
	student linlinzzo;
	linlinzzo.setAge(3);
	linlinzzo.name = "林林";
	cout << linlinzzo.name << " is " << linlinzzo.getAge() << " years old." << endl;
}
```
类可以进行继承。


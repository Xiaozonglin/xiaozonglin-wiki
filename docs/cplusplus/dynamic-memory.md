---
sidebar_position: 4
---
# 动态内存

可以使用`new`和`delete`来动态管理内存。

```c++
double* pvalue = NULL; // 初始化为 null 的指针
pvalue = new double; // 为变量请求内存

delete pvalue;
```
也能用`malloc()`但`new`不只是分配了内存，它还创建了对象。

```c++
// 动态分配,数组长度为 m
int *array=new int [m];

//释放内存
delete [] array;
```
```c++
int **array;
// 假定数组第一维长度为 m， 第二维长度为 n
// 动态分配空间
array = new int *[m];

for( int i=0; i<m; i++ ) {
	array[i] = new int [n];
}

//释放
for( int i=0; i<m; i++ ) {
	delete [] array[i]; 
}
delete [] array;
```
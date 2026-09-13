# Redis

Redis是一种NoSQL数据库，可用于缓存、消息队列等。

如果让MySQL数据库服务成千上万的用户，磁盘I/O会成为应用处理请求的时间瓶颈。如果将数据存在内存中，数据库直接从内存中读取数据，就可以解决这个问题。

Redis有以下优势：

- **性能极高**
- 简单易用
- 支持数据持久化、主从复制、哨兵模式等高可用特性

Redis支持五种基本数据类型和五种高级数据类型。

基本数据类型分别是：

- 字符串String
- 列表List
- 集合Set
- 有序集合SortedSet
- 哈希Hash

高级数据类型分别是：

- 消息队列Stream
- 地理空间Geospatial
- HyperLogLog
- 位图Bitmap
- 位域Bitfield

## 命令

数据在Redis中以键值对的形式存储，`SET`命令需要指定一个键（区分大小写）和一个值。`GET <key>`可以获取指定键的值，`DEL`命令可以删除一个键。

Redis中很多数据都是用字符串存储的，比如数字。

```bash
linlinzzo@linlinzzo:~$ redis-cli
127.0.0.1:6379> SET name linlin
OK
127.0.0.1:6379> GET name
"linlin"
127.0.0.1:6379> SET age 3
OK
127.0.0.1:6379> GET age
"3"
127.0.0.1:6379> DEL age
(integer) 1
```

`EXISTS <key>`命令可以判断一个键是否存在，存在返回1，不存在返回0。

`KEYS *`查找所有的键，`KEY *me`查找所有以me结尾的键。

`FLUSHALL`删除所有键。

`TTL <key>`查看键的过期时间（-2为过期，-1没有过期时间），`EXPIRE <key> <second>`设置过期时间，
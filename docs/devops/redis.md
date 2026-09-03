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

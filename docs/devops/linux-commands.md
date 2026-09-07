# Linux基础命令

## 文件读写

`more <path>`分页查看文件

`head -num <path>`显示path文件前num行

`tail -num <path>`显示文件后num行，`-f`动态显示文件内容

`ln -s <source> <dest>`创建从源文件到目标文件的软链接

`find <path> [-name] <keyword>`查找文件，`-name`按文件名查找

`gzip <path>`压缩，不保留源文件，不能压缩目录，用`gunzip`解压

`file <path>`查看文件类型

`zip [-r] <output> <input>`压缩文件或目录，使用`unzip`解压

## 用户与权限管理

`chmod`修改文件或文件夹权限

`chown`修改文件的属主

`chgrp`修改文件所属的组

`passwd [-l/-u/-d/-f]`修改口令，`-l`锁定口令（禁用账号），`-f`强迫用户下次登录时修改口令

`useradd` `userdel` `usermod`创建、删除、修改用户

`groupadd` `groupdel` `groupmod` 创建、删除、修改用户组

## 命令

`whereis <name>`找到文件位置及其帮助文件
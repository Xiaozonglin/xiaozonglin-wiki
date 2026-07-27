# 语句与指令
指令助记符告诉CPU要做什么，比如mov sub等。

有一些伪指令，不是给cpu看的，而是给编译器看的。

| 伪指令     | 用途        | 实例              |
| ------- | --------- | --------------- |
| db      | 定义1字节     | a db 0x55       |
| dw      | 定义字（2字节）  | b dw 0x1234     |
| dd      | 定义双字（4字节） | c dd 0x12345678 |
| equ     | 定义常量      | d equ 256       |
| resb    | 预留字节空间    | buffer resb 128 |
| resw    | 预留字空间     |                 |
| resd    | 预留双字空间    |                 |
| %define | 宏定义常量     |                 |
```assembly
mov eax, 42             ; 十进制：直接写数字  
mov eax, 0x2A           ; 十六进制：0x 前缀（推荐写法）  
mov eax, 2Ah            ; 十六进制：h 后缀  
mov eax, 0o52           ; 八进制：0o 前缀  
mov eax, 52o            ; 八进制：o 后缀  
mov eax, 101010b        ; 二进制：b 后缀  
mov eax, 0b101010       ; 二进制：0b 前缀
```

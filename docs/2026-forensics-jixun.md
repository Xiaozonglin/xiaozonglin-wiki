# 2026取证集训——美亚25个人赛

## 陈民浩的手机

对该手机进行iOS检材分析

### 01 这个智能手机是什么操作系统

基础信息可知：iPhone 17.1.1

或iDevice_info.txt HumanReadableProductVersionString: 17.1.1

### 02/03 在这个手机中, 有多少组国际移动设备识别码(IMEI)号码；### 以下哪一个才是正确的国际移动设备识别码(IMEI)号码

一组 357328098205226

### 04 请指出最后使用的使用者身分模组(SIM)的集成电路卡识别码(ICCID)

基本信息可知 89852122206020998419

### 05 请指出最后使用的 Apple ID 是多少

基本信息可知 whoishogan@gmail.com

### ==06 蓝牙模组中的蓝牙地址是多少==

iDevice_info.txt

BluetoothAddress: f8:38:80:bb:f5:28

### ==07 这个智能手机曾经启动个人热点分享网络, 请问他的热点名称==

找不到，看题解，在iDevice_info.txt搜索SSID

能看到热点的密码

```
<< = Row = >>
Service : AirPort
Account : _AppleWi-FiInternetTetheringSSID_
Data : 12345678
Access group : apple
Protection class : AfterFirstUnlock
```

> ==iPhone 的热点名称在未越狱修改系统文件的情况下无法自定义, 中文系统下默认的热点名称为 `<UserName>的iPhone`, 英文系统下默认的热点名称为 `<UserName>'s iPhone`.==
> ==若 iPhone 手机未登录 Apple ID 或未设置用户名, 则热点的 SSID 将为 `iPhone`.==


### 08 这个智能手机没有连接过以下哪一个服务集标识符(SSID)

- A.Hongn Home
- B.CMHK
- C.1010 free wifi
- D.ErrorError

AB

在基本信息-Wi-Fi连接记录中可以看到AB两个网络没有连接过。

### 09 请指出首次连接服务集识别码(SSID)名称为"CMHK"的无线区域网络(Wi-Fi)的日期及时间

？

### ==10 安装了以下即时哪个通讯软件?==

- i) WhatsApp
- ii) WeChat
- iii) WhatsApp Business
- iv) QQ

WhatsApp

其他三项都没办法在基本信息-应用列表中搜到

==刚才失误了，微信的包名为`com.tencent.xin`，刚才用WeChat左右搜不到==

### 11 承上题, 请指出即时通讯软件"WhatsApp"的版本

看详细信息可得版本号为731647702.0

### ==12 陈民浩的手机中, 总共安装 3 个文件传输软件, 封包名称分别为 `com.apple.Sharing.AirDropUI`, `com.lenovo.anyshare`, `com.estmob.paprika`, 其中有哪一个软件曾经用来传送/接收文件功能==

卡住了，根据题解找到`\Applications\com.estmob.paprika\Library\com.estmob.sendanywhere.sdk.database.realm`，`.realm`是一个数据库文件，用Navicat打不开，安装弘连的数据库取证工具，可以看到里面的信息。

### 13 承上题, 与其有传送/接收过资料装置的装置 ID 是多少

在数据库中可以找到PeerDeviceID是5402313593439

### 14 承上题, 这个装置名称是

在另一张表DeviceInfoEntity中找到对应的名称为Samsung SM-G930F

### ==15 承上题, 本机装置的装置 ID 是多少==

找不到，看题解

3836403626142

`\Applications\com.estmob.paprika\Library\Preferences\com.estmob.paprika.plist`

```xml
<dict>
            <key>app_version</key>
            <string>23.5.4.6</string>
            <key>consent_type</key>
            <string>1</string>
            <key>device_id</key>
            <string>3836403626142</string>
        </dict>
```

### ==16 承上题, 陈民浩的手机(`CHAN_MH_mobile.zip`)是传送方或是接收方==

没做出来，看题解要结合陈民浩的安卓手机判断

### 17 根据传送档案的名称, 判断是以下哪一类型

- A.屏幕截图
- B.手机拍摄影片
- C.PDF 文件
- D.zip 压缩文件

A

从前面的realm数据库可以得知文件名为`Screenshot_20250423-105307_Gallery.jpg`，应为屏幕截图。

### ==18 承上题, 接收至哪一个装置==

- A.CHAN_MH_mobile.zip
- B.blk0_sda.bin
- C.FUNG_CC_mobile.zip
- D.LAM_KH_Mobile.zip
- E.WONG_CW_mobile.zip

`CHAN_MH_mobile.zip`为接收方。

### 19 承上题, 传送方是通过此文档传输软件的哪个模式作出传送

- A.SEND_PARTIALLY
- B.SEND_PAPRIKA
- C.SEND_DIRECTLY
- D.SEND_BYCLOUD
- E.SEND_BLUETOOTH

C

在安卓手机的数据库`blk0_sda.bin/分区21/data/com.estmob.android.sendanywhere/databases/main.db`中可以看到模式为`SEND_DIRECTLY`

### ==20 从来没有安装以下哪个网络浏览器==

- A.Safari
- B.Chrome
- C.Firefox
- D.edge

BCD

基本信息-应用列表可以搜

题解：在"应用授权日志"分析结果和"网络使用详情"分析结果中, 均未能找到 Safari 之外 3 个浏览器的使用记录.

### 21 承上题, 网络浏览器 Safari 有多少个书签(Bookmark)记录

9

Safari-书签记录

### 22 承上题, 曾经通过 Safari 浏览器用下列哪一个字词进行过搜索

- A.非法处理尸体最高刑罚
- B.escape room hong kong
- C.cypto wallet
- D.非法处理尸体

ABC

Safari-搜索历史

### ==23 有多少个图片文件曾经储存到 iCloud==

2

数据库`\var\mobile\Library\Application Support\CloudDocs\session\db\client.db`的`client_items`表下21、22为两张图片文件。

### ==24 相册中有多少张图片是通过屏幕截图功能取得==

15

基本信息-照片-屏幕快照

## 冯子超的手机

### 25 这部智能手机连接过多少个 Wi-Fi 网络

2

基本信息-WiFi连接记录

### 26 这部智能手机曾经连接过以下哪个无线网络

- i) THREE_WIFI
- ii) wanchai
- iii) iPhone(2)
- iv) Router

iPhone (2)和wanchai

### ==27 这部手提手机最早连接(非热点) Wi-Fi 的时间是什么==

FirstJoinWithNewMacTimestamp

2025-04-15T11:29:29Z

题解中使用的是addedAt字段

### 28 承上题, 请列出这个连接的服务集识别码(SSID)

wanchai

### ==29 承上题, 请列出这个连接的登入金钥==

hellowanchai

不熟悉，在分析-钥匙串-WiFi密码中可以找到

### ==30 相册中有两张 GIF "IMG_0057.GIF"及"IMG_0062.GIF", 请指出由哪一个软件拍摄==

- A.Infltr
- B.Discreet
- C.Meitu
- D.Prisma

分析-图片-应用里找

### ==31 曾经以空投(AirDrop)方式成功传送了文件到另外一个装置, 以下哪一个陈述是正确的==

- A.传送了一个图片文件
- B.传送了两个图片文件
- C.传送了一个图片文件及一个文件
- D.传送了一个图片文件及两个文件

在该检材的文件系统中全局搜索

```
com.apple.UIKit.activity.AirDrop
com.apple.sharingd
com.apple.mobilesildeshow
com.apple.documentsapp
```

这些包名从上到下分别是:

- AirDrop 前端
- AirDrop 后端
- 照片
- 文档

### 32 原生 APP "相片"中, 有一个图片文件曾经通过空投"AirDrop"方式成功传送, 指出这个图片文件的文件全名

### 33 承上题, 请写出这个图片文件的开始传送的日期及时间

### 34 请指出哪一个多媒体文件同时储存在 APP "文件"(套件识别码: com.apple.DocumentsApp)及 APP "照片"(套件识别码: com.apple.mobileslideshow)中

### 35 请指出在 APP "照片"中的图片文件"IMG_0079.JPG"是由哪一个 APP 拍摄

### 36 承上题, 已知该图片文件是由上述 APP 所拍摄, 并其后储存在 APP "照片"成"IMG_0079.JPG", 请问该图片的原文件名称

### 37 承上题, 请指出原文件的建立时间

### 38 请指出在 APP "照片"中, 储存多媒体文件"IMG_0014.MOV"与储存"IMG_0016.MOV"之间有没有其他多媒体文件储存到 APP "照片"中

### 39 承上题, 以下哪个陈述是正确描述上一题的答案

### 40 APP "照片"中, "IMG_0027.HEIC"的原地理位置信息(WGS84)是

- A.(22.2816569, 114.1756115)
- B.(22.2826366666667, 114.168503333333)
- C.(22.2826216666667, 114.168525)
- D.(22.2826216666667, 114.168503333333)

### 41 曾经通过网络浏览器 Safari 下载了多少个图片文件

### 42 多媒体文件"IMG_0004.MOV"曾被修改后再储存成另一个文件, 该文件名称是?

- A.IMG_0085.mov
- B.IMG_0086.mov
- C.IMG_0087.mov
- D.IMG_0088.mov

### 43 曾经通过人工智能聊天 APP "POE"查询一个问题, 请列出这个问题的完整句子

### 44 承上题, 请指出提问的日期及时间

### 45 承上题, 当时使用的是哪一个机器人

### 46 承上题, 当时的使用者名称是

### 47 请指出即时通讯软件 WeChat 的 WeChat ID

### 48 承上题, 这个 WeChat ID 关注了多少个视频号

### 49 请指出即时通讯软件 WhatsApp 的 WhatsApp  ID

### 50 即时通讯软件 WhatsApp 中, 封存了下列哪个聊天群？

### 51 即时通讯软件 WhatsApp 中, 总共追踪了多少个频道

### 52 即时通讯软件 WhatsApp 中, 下列哪个是群组"Investors"的管理员

- i) 85254974406@s.whatsapp.net
- ii) 85260927726@s.whatsapp.net
- iii) 85254961408@s.whatsapp.net

### 53 即时通讯软件 WhatsApp 中, 群组"Investors"的群组 ID

### 54 即时通讯软件 WhatsApp 中, 社群名称是什么

### 55 承上题, 请指出这个社群的群组图案的 SHA256 哈希值

### 56 即时通讯软件 WhatsApp 中, 找出 WhatsApp ID `85254961408@s.whatsapp.net` 曾经是在而现在已经不在的群组, 请指出该群组的名称

### 57 即时通讯软件 WhatsApp 中, 总共出现了多少个投票活动

### 58 承上题, 总共在多少个投票活动中作出了投票

### 59 即时通讯软件 WhatsApp 中，群组"IQ COIN 💰💰💰💰"对话内容正在策划哪一种犯罪计划？

- A.诈骗
- B.抢劫
- C.谋杀
- D.以上都不对

### 60 承上题, 该群组建立者的 WhatsApp ID 是什么

### 61 承上题, 该群组的建立时间是什么
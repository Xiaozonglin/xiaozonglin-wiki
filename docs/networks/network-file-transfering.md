# 网络文件传输用例

## nc反向文件传输

问题背景：我有一台路由器（IP 192.168.1.1）的shell，没有tftp、scp和公网连接，里面的nc是被精简过的，只能对外连接，不能用`-l`参数。我需要将电脑（IP 192.168.1.254）上的一个文件传输到路由器上。

解决方案：电脑创建一个位于9999端口的服务，只要路由器的nc连上来，电脑就向路由器发送文件。

Windows系统内执行：

```powershell
$file = "C:\Users\foo\Downloads\openwrt\openwrt.itb"
$bytes = [System.IO.File]::ReadAllBytes($file)
$listener = [System.Net.Sockets.TcpListener]::Create(9999)
$listener.Start()
Write-Host "等待路由器连接..."
$client = $listener.AcceptTcpClient()
$stream = $client.GetStream()
$stream.Write($bytes, 0, $bytes.Length)
$stream.Close()
$client.Close()
$listener.Stop()
Write-Host "发送完成！"
```

路由器内执行：

```bash
nc 192.168.1.254 9999 > /tmp/openwrt.itb
```

传输完成后可以用md5对比校验一下。
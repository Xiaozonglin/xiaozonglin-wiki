---
sidebar_position: 4
---
# WebSocket

启动一个echo服务。
```python
from websockets.sync.server import serve
def echo(websocket):
    for message in websocket:
        websocket.send(message + "1")
def main():
    with serve(echo, "localhost", 8765) as server:
        server.serve_forever()
if __name__ == "__main__":
    main()
```

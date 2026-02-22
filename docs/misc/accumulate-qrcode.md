---
sidebar_position: 1
---

# 视频中的二维码碎片

ref: [2025 年度总结（附解谜红包） | 萤火之光](https://alampy.com/2026/02/16/life/21-2025-wrapped/)

向`accumulate_changes`函数传递需要分析的视频文件，可以输出其其中~~蕴含~~的二维码。

```python
import cv2
import numpy as np

def accumulate_changes(video_path):
    """
    累积所有帧之间的变化，而不是相对于第一帧
    """
    cap = cv2.VideoCapture(video_path)
    
    # 读取前两帧初始化
    ret, prev_frame = cap.read()
    ret, curr_frame = cap.read()
    
    if not ret:
        return
    
    prev_gray = cv2.cvtColor(prev_frame, cv2.COLOR_BGR2GRAY)
    accumulator = np.zeros_like(prev_gray, dtype=np.float32)
    frame_count = 2
    
    print("正在处理视频...")
    
    while True:
        # 计算当前帧与前一帧的差异
        curr_gray = cv2.cvtColor(curr_frame, cv2.COLOR_BGR2GRAY)
        frame_diff = cv2.absdiff(curr_gray.astype(np.float32), prev_gray.astype(np.float32))
        
        # 二值化，只保留明显变化
        _, thresh = cv2.threshold(frame_diff.astype(np.uint8), 20, 255, cv2.THRESH_BINARY)
        
        # 累积变化
        accumulator += thresh.astype(np.float32)
        
        # 更新
        prev_gray = curr_gray
        ret, curr_frame = cap.read()
        if not ret:
            break
        
        frame_count += 1
        if frame_count % 10 == 0:
            print(f"已处理 {frame_count} 帧")
    
    cap.release()
    
    # 归一化累积结果
    result = (accumulator / np.max(accumulator) * 255).astype(np.uint8)
    
    # 保存
    cv2.imwrite('accumulated_changes.png', result)
    print(f"\n完成！处理了 {frame_count} 帧")
    print("已保存: accumulated_changes.png")
    
    return result

accumulate_changes("RedPacket2026.mp4")
```
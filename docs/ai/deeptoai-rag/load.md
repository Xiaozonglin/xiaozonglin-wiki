---
sidebar_position: 2
---
# 知识库的加载

```python
from langchain_community.document_loaders import ( 
	WebBaseLoader, # 网页 
	PyPDFLoader, # PDF 
	TextLoader, # 文本文件 
	DirectoryLoader, # 目录 
	CSVLoader, # CSV
	)
# 示例：加载网页
loader = WebBaseLoader("https://lilianweng.github.io/posts/2023-06-23-agent/")
docs = loader.load()
```
langchain可以直接加载网页、docx、markdown等文件
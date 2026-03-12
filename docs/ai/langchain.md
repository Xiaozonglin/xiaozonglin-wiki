---
sidebar_position: 3
---
# LangChain

## 模型

静态模型：

```python
from langchain.agents import create_agent
agent = create_agent( "openai:gpt-5", tools=tools )
```
## 工具

工具赋予智能体执行行动的能力。

```python
from langchain.tools import tool
from langchain.agents import create_agent
@tool
def search(query: str) -> str:
	"""搜索信息。"""
	# requests...
	return f"结果：{query}"

agent = create_agent(model, tools=[search])
```
装饰器可以改为`@tool("name", description="...")`来覆盖名称和描述。
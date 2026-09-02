# k8s

容器化面临的问题：容器数量多，架构复杂，管理难度大

- 高可用
- 可拓展性：动态拓展或缩减服务资源
- 灾难恢复
- 弹性伸缩

## 资源对象

节点（node）：一个物理机或虚拟机

pod：最小调度单元，一个或多个应用容器的组合（最佳实践：一个pod只运行一个容器，以便解耦和拓展）IP地址在创建的时候分配，不稳定，且只能在集群内部访问。

service：将一组pod封装成一个service，可以用统一的地址访问，类似于“智能路由器”。

Ingress：配置从集群外部访问集群内部的方式

Config Map：封装明文配置信息，让应用程序读取使用。敏感信息用Secret组件存储（但仅仅只是base64了而已）。

Volumes：持久化存储文件

deploy：在pod上的抽象，将多个pod组合在一起

Stateful Set：将多个有状态的pod组合在一起（最佳实践：将有状态的服务从集群中剥离出来，在集群外部署）

## 架构

k8s是master-worker架构

工作节点包含三个部分：kubelet（管理pod）、kube-proxy（提供网络代理和负载均衡服务）和container-runtime（容器运行时，负责拉取、创建、启动、暂停、删除容器）。

Master节点上有这些组件：kube-apiserver、etcd、Controller Manager和Scheduler。其中，

- kube-apiserver是整个集群的网关，例如使用`kubectl`创建pod时，apiserver会验证请求的合法性，再转发给对应的组件处理。
- Scheduler监控集群节点的资源使用情况，并根据调度策略进行调度，例如新增pod时将pod调度到资源占用少的节点。
- Controller Manager监控各资源对象的状态，并对故障做出响应。
- etcd是一个键-值存储系统，存储资源对象的状态信息。

## minikube & kubectl

minikube用于创建一个单节点集群，kubectl用来管理集群。
# Kubernetes

容器化面临的问题：容器数量多，架构复杂，管理难度大

- 高可用
- 可拓展性：动态拓展或缩减服务资源
- 灾难恢复
- 弹性伸缩

## 资源对象

节点（node）：一个物理机或虚拟机

pod：最小调度单元，一个或多个应用容器的组合（最佳实践：一个pod只运行一个容器，以便解耦和拓展，sidecar除外）IP地址在创建的时候分配，不稳定，且只能在集群内部访问。

service：将一组pod关联成一个service，可以用统一的地址访问，类似于“智能路由器”。

Ingress：配置从集群外部访问集群内部的方式

Config Map：封装明文配置信息，让应用程序读取使用。敏感信息用Secret组件存储（但仅仅只是base64了而已）。

Volumes：持久化存储文件

deploy：在pod上的抽象，将多个pod组合在一起，可以进行滚动更新等。

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

kubectl常用命令：

- `kubectl get nodes/svc/pod`查看资源对象
- `kubectl get pod -o wide`查看pod（显示所在节点和IP地址）
- `kubectl get all`查看所有资源对象
- `kubectl get all -n portainer`查看所有资源对象（指定要查看的命名空间）
- `kubectl run nginx --image=nginx`创建一个pod
- `kubectl create service/deployment.. nginx-deployment --image=nginx`创建资源对象，pod会自动创建，创建后的pod名字格式为`Deployment的ReplicaSet的名字-随机字符串`。Deployment管理ReplicaSet，ReplicaSet管理pod。
- `kubectl delete deployment/.. <name>`删除资源对象

kubectl调试命令：

- `kubectl logs pod的名字`查看pod的日志
- `kubectl exec -it pod的名字 -- /bin/bash`进入pod容器中（如果有多个容器，则随机进入其中一个）

## 配置文件与公开服务

- `kubectl create -f nginx-deploymet.yaml`指定配置文件创建资源对象
- `kubectl delete -f nginx-deployment.yaml`删除资源对象
- `kubectl apply -f nginx-deploymet.yaml`应用到集群中，创建或更新资源对象

如果遇到流量高峰，修改一下配置文件就可以提高副本数量。

用命令行创建服务（service）：`kubectl create service nginx-service` 或 `kubectl expose deployment nginx-deployment`

如果需要在集群外部访问，需要将service从ClusterIP改为NodePort类型。

## Reference

[Kubernetes一小时轻松入门](https://www.bilibili.com/video/BV1Se411r7vY?vd_source=a3a2b7b6b90065dbe4d1134d3696c3e0)

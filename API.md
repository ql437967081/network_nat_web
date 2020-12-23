# API文档

[TOC]

## 连接路由器

POST: /telnet

参数：router_id	取值范围：[1, 2, 3]	（分别连接R1、R2、R3）

返回值：connection_id	取值：str类型，像数据库连接那样（c1、c2等），为每一个连接保存一个对象实例

## 断开连接

POST: /exit

参数：connection_id

## 获取接口信息

GET: /interface

参数：connection_id

​			abbr（接口缩写）取值：[ ‘f0/0’, ‘f0/1’, ‘s0/0/0’, ‘s0/0/1’ ]

返回值：

```javascript
{
	name: 'FastEthernet0/0',
    abbr: 'f0/0',
    ip_address: {
        primary: { ip: '172.16.0.2', netmask: '255.255.0.0', mask_bit: 16 },
        secondary: []	// 见实验手册51页NAT章节
    },
    ip_nat: null,	// null | ‘inside’ | 'outside'
    is_open: true
}
```

## 设置接口信息

POST: /interface

参数：connection_id

* request body:

```javascript
{
    abbr: 'f0/0',
    ip_address: {
        primary: { ip: '172.16.0.2', netmask: '255.255.0.0' },
        secondary: []
    },
    ip_nat: null,	// null | ‘inside’ | 'outside'
    is_open: true
}
```

返回值：output	输出信息

## 获取主机名

GET: /hostname

参数：connection_id

返回值：hostname

## 设置主机名

POST: /hostname

参数：connection_id

* request body:

```javascript
{
    hostname: 'R1'
}
```

返回值：output

## 查看NAT转换表

GET: /nat_translations

参数：connection_id

执行命令：

```
show ip nat translations
```

返回值：output

## 清除NAT转换表

DELETE: /nat_translations

参数：connection_id

执行命令：

```
clear ip nat translation *
```

## Ping

GET: /ping

参数：connection_id	target	source（源地址、可能为空）

返回值：output

## 设置静态路由

POST: /static_route

参数：connection_id

执行命令：（为R1加上去往R3的静态路由）

```
conf t
ip route 200.1.1.0 255.255.255.0 s0/0/0
end
```

返回值：output

## 配置静态NAT

POST: /static_nat

参数：connection_id

执行命令：（在R2上完成静态NAT的配置）

```
conf t
ip nat inside source static 192.168.1.1 200.1.1.254
end
```

返回值：output

## 删除静态NAT

DELETE: /static_nat

参数：connection_id

执行命令：（在R2上删除静态NAT的配置）

```
conf t
no ip nat inside source static 192.168.1.1 200.1.1.254
end
```

返回值：output

## 配置用户访问控制列表

POST: /access_list

参数：connection_id

执行命令：（在R2上通过使用用户访问控制列表来定义本地地址池）

```
conf t
access-list 1 permit 192.168.1.0 0.0.0.255
end
```

返回值：output

## 配置动态NAT

POST: /dynamic_nat

参数：connection_id

执行命令：（在R2上完成动态NAT的配置）

```
conf t
ip nat pool nju 200.1.1.253 200.1.1.254 p 24
ip nat inside source list 1 pool nju
end
```

返回值：output

## 删除动态NAT

DELETE: /dynamic_nat

参数：connection_id

执行命令：（在R2上删除动态NAT的配置）

```
conf t
no ip nat inside source list 1 pool nju
no ip nat pool nju 200.1.1.253 200.1.1.254 p 24
end
```

返回值：output

## 配置PAT

POST: /pat

参数：connection_id

执行命令：（在R2上完成PAT的配置）

```
conf t
ip nat pool nju 200.1.1.253 200.1.1.253 p 24
ip nat inside source list 1 pool nju overload
end
```

返回值：output
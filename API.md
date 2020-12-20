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
        primary: { ip: '172.16.0.2', netmask: '255.255.255.0', mask_bit: 24 },
        secondary: []	// 见实验手册51页NAT章节
    },
    is_open: true
}
```

## 设置接口信息

POST: /interface

参数：

connection_id

* request body:

```javascript
{
    abbr: 'f0/0',
    ip_address: {
        primary: { ip: '172.16.0.2', netmask: '255.255.255.0', mask_bit: 24 },
        secondary: []
    },
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

参数：

connection_id

* request body:

```javascript
{
    hostname: 'R1'
}
```

返回值：output


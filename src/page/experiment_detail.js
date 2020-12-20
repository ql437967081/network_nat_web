import React from 'react';
import { Collapse, Image ,Typography} from 'antd';
import topography from './NAT网络拓扑.png';
import { Table} from 'antd';

const { Paragraph } = Typography;

const { Panel } = Collapse;

const columns = [
    {
        title: '命令用途',
        dataIndex: 'name',
        key: 'name',
        width: 50
    },
    {
        title: '命令格式',
        dataIndex: 'standard',
        key: 'standard',
        width: 50
    }];

const data = [
    {
        key: '1',
        name: '配置静态NAT',
        standard: 'ip nat inside source static [inside local ip address] [inside global\n' +
            'ip address]\n',
    },
    {
        key: '2',
        name: '删除静态 NAT 条目',
        standard: 'no ip nat inside source static [inside local ip address] [inside\n' +
            'global ip address]',
    },
    {
        key: '3',
        name: '指定内部 ip 地址接口',
        standard: 'ip nat inside',
    },
    {
        key: '4',
        name: '指定外部 ip 地址接口 ',
        standard: 'ip nat outside',
    },
    {
        key: '5',
        name: '查看 NAT 转换表',
        standard: 'show ip nat translations',
    },
    {
        key: '6',
        name: '清空 NAT 转换表',
        standard: 'clear ip nat translation *',
    },
];

export default function ExperimentDetail () {
    return (
        <Collapse defaultActiveKey={'topology'}>
            <Panel header={'实验前准备'} key={'preprocess'}>
                <Paragraph>
                    &ensp;&ensp;任何位于内部网络和外部网络之间的设备都可以使用 NAT（RFC3022 对 NAT 进行定
                    义、讲解）。转换的地址不一定必须是私有地址，它可以是任何地址。
                </Paragraph>
                <Paragraph>
                    1. 需要使用地址转换常见的原因：
                </Paragraph>
                <Paragraph>
                    <ul>
                        <li>
                            由于 ISP 没有分配足够的共有 IPv4 地址，不得不使用私有地址；
                        </li>
                        <li>
                            使用了公有地址，但是更换了 ISP，新的 ISP 不再支持这些公有地址；
                        </li>
                        <li>
                            两家公司进行合并，他们使用了相同的地址空间；
                        </li>
                        <li>
                            要将同一个 IP 地址分配给多台机器；
                        </li>
                    </ul>
                </Paragraph>

                <Paragraph>
                    2. NAT术语：
                </Paragraph>
                <Paragraph>
                    <ul>
                        <li>
                            内部本地地址：分配给位于内部网络主机的 IPv4 地址。内部本地地址可能不是由网络
                            信息中心（NIC）或者服务提供商分配的 IPv4 地址。
                        </li>
                        <li>
                            内部全局地址：由网络信息中心（NIC）或者服务提供商分配的合法 IPv4 地址，他对
                            外代表着一个或者多个内部本地 IPv4 地址。
                        </li>
                        <li>
                            外部本地地址：外部主机显示给内网的 IPv4 地址。外部本地地址不一定是合法的地
                            址，它是从可路由地址空间分配到内部网络的地址。
                        </li>
                        <li>
                            外部全局地址：主机所有者分配给外部网络上某一主机的 IPv4 地址。外部全局地址从
                            全局课路由地址或者空间中分配。
                        </li>
                    </ul>
                </Paragraph>

                <Paragraph>
                    3. 地址转换的类型：
                </Paragraph>
                <Paragraph>
                    <ul>
                        <li>
                            静态 NAT：将未注册的 IPv4 地址映射到注册的 IPv4 地址（一对一）。在必须从网络外
                            部访问设备时静态 NAT 特别有用。
                        </li>
                        <li>
                            动态 NAT：将未注册的 IPv4 地址与某个注册的 IPv4 地址组中的注册的 IPv4 进行映
                            射。
                        </li>
                        <li>
                            过载 NAT：使用不同的端口号将多个未注册 IPv4 地址映射到单个注册的 IPv4 地址
                            （多对一）。过载也称 PAT，是动态 NAT 的一种形式。
                        </li>
                    </ul>
                </Paragraph>

                <Paragraph>
                    4. NAT具有以下优势：
                </Paragraph>

                <Paragraph>
                    <ul>
                        <li>
                            不需要重新分配所有需要访问外部网络的主机的地址，从而节约时间和金钱。
                        </li>
                        <li>
                            通过应用端口级的多路复用节约了地址。
                        </li>
                        <li>
                            保护网络安全。
                        </li>
                    </ul>
                </Paragraph>


            </Panel>
            <Panel header={'实验要求'} key={'requirement'}>
                <Paragraph>
                    &ensp;&ensp;本次实验，希望通过地址转换，使拓扑图中左边内部网络中的内部本地地址分别通过
                    三种方式转换成外部全局地址并成功的访问右边网络中的R3。
                </Paragraph>
            </Panel>
            <Panel header={'实验拓扑'} key={'topology'}>
                <Image src={topography} />
            </Panel>

            <Panel header={'实验过程'} key={'process'}>
                <Paragraph>
                    &ensp;&ensp;1. 配置每个设备的名称和接口 ip 地址，确保彼此之间的三层连通性。
                </Paragraph>
                <Paragraph>
                    <blockquote>
                        R1(config)#interface s0/0/0<br/>
                        R1(config-if)#ip address 192.168.1.1 255.255.255.0<br/>
                        R1(config-if)#ip address 192.168.1.3 255.255.255.0 secondary<br/>
                        R1(config-if)#ip address 192.168.1.4 255.255.255.0 secondary<br/>
                        R1(config-if)#no shutdown<br/>
                        R2(config)#interface s0/0/0<br/>
                        R2(config-if)#ip address 192.168.1.2 255.255.255.0<br/>
                        R2(config-if)#no shutdown<br/>
                        R2(config)#interface s0/0/1<br/>
                        R2(config-if)#ip address 200.1.1.1 255.255.255.0<br/>
                        R2(config-if)#no shutdown<br/>
                        R3(config)#interface s0/0/1<br/>
                        R3(config-if)#ip address 200.1.1.2 255.255.255.0<br/>
                        R3(config-if)#no shutdown<br/>
                    </blockquote>
                </Paragraph>
                <Paragraph>
                    &ensp;&ensp;2. 在R2上完成静态NAT的配置。
                </Paragraph>
                <Paragraph>
                    <blockquote>
                        R2(config)#ip nat inside source static 192.168.1.1 200.1.1.254<br/>
                        *Oct 27 09:04:33.599: %LINEPROTO-5-UPDOWN: Line protocol on Interface NVI0,<br/>
                        changed state to<br/>
                        R2(config)#interface s0/0/0<br/>
                        R2(config-if)#ip nat inside<br/>
                        R2(config)#interface s0/0/1<br/>
                        R2(config-if)#ip nat outside<br/>
                        R2(config-if)#end<br/>
                        *Oct 27 09:05:32.947: %SYS-5-CONFIG_I: Configured from console by console<br/>
                        R2#debug ip nat<br/>
                        IP NAT debugging is on<br/>
                        R2#_<br/>
                    </blockquote>
                </Paragraph>
                <Paragraph>
                    &ensp;&ensp;然后在 R1 上用本地地址 192.168.1.1 Ping 200.1.1.2,结果没有ping通，为什么?
                </Paragraph>
                <Paragraph>
                    <blockquote>
                        R1#ping 200.1.1.2<br/>
                        Type escape sequence to abort.<br/>
                        Sending 5, 100-byte ICMP Echos to 200.1.1.2, timeout is 2 seconds:<br/>
                        .....<br/>
                        Success rate is 0 percent (0/5)<br/>
                        R1#_<br/>
                    </blockquote>
                </Paragraph>
                <Paragraph>
                    &ensp;&ensp;查看R1上是否有地址转换的NAT表，转换表为空，说明没有发生地址转换，分析原
                    因，R1去往200.1.1.0网段，需要一条静态路由。
                </Paragraph>
                <Paragraph>
                    <blockquote>
                        R1#show ip nat translations<br/>
                        R1#_<br/>
                    </blockquote>
                </Paragraph>

                <Paragraph>
                    &ensp;&ensp;为R1加上去往R3的静态路由，现在R1可以ping通R3。
                </Paragraph>
                <Paragraph>
                    <blockquote>
                        R1(config)#ip route 200.1.1.0 255.255.255.0 serial 0/0/0<br/>
                        R1(config)#end<br/>
                        R1#ping 200.1.1.2<br/>
                        Type escape sequence to abort.<br/>
                        Sending 5, 100-byte ICMP Echos to 200.1.1.2, timeout is 2 seconds:<br/>
                        !!!!!<br/>
                        Success rate is 100 percent (5/5), round-trip min/avg/max = 40/42/44 ms<br/>
                        R1#<br/>
                    </blockquote>
                </Paragraph>

                <Paragraph>
                    &ensp;&ensp;在R1上使用扩展ping，发送50个数据包，默认情况下为5个数据包。
                </Paragraph>
                <Paragraph>
                    <blockquote>
                        R1#ping<br/>
                        Protocol [ip]:<br/>
                        Target IP address: 200.1.1.2<br/>
                        Repeat count [5]: 50<br/>
                        Datagram size [100]:<br/>
                        Timeout in seconds [2]:<br/>
                        Extended commands [n]:<br/>
                        Sweep range of sizes [n]:<br/>
                        Type escape sequence to abort.<br/>
                        Sending 50, 100-byte ICMP Echos to 200.1.1.2, timeout is 2 seconds:<br/>
                        !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!<br/>
                        Success rate is 100 percent (50/50), round-trip min/avg/max = 40/43/44 ms<br/>
                        R1#_<br/>
                    </blockquote>
                </Paragraph>
                <Paragraph>
                    &ensp;&ensp;快速切换到R2上，来查看具体的转换过程。
                </Paragraph>
                <Paragraph>
                    <blockquote>
                        *Oct 27 09:11:34.791: NAT*: s=192.168.1.1->200.1.1.254, d=200.1.1.2 [5]<br/>
                        *Oct 27 09:11:34.819: NAT*: s=200.1.1.2, d=200.1.1.254->192.168.1.1 [5]<br/>
                    </blockquote>
                </Paragraph>
                <Paragraph>
                    &ensp;&ensp;查看R2的NAT转换表，R2建立NAT表，当有流量符合这个匹配规则时就会两个地
                    址进行转换。
                </Paragraph>
                <Paragraph>
                    <blockquote>
                        R2#show ip nat translations<br/>
                        Pro Inside global Inside local Outside local Outside global<br/>
                        --- 200.1.1.254 192.168.1.1 --- ---<br/>
                        R2#_<br/>
                    </blockquote>
                </Paragraph>
                <Paragraph>
                    &ensp;&ensp;3. 在 R2 上完成动态 NAT 的配置。<br/>
                    &ensp;&ensp;将原来的静态 NAT 的条目删除，通过使用用户访问控制列表来定义本地地址池。
                </Paragraph>

                <Paragraph>
                    <blockquote>
                        R2(config)#no ip nat inside source static 192.168.1.1 200.1.1.254<br/>
                        *Oct 27 09:17:07.491: ipnat_remove_static_cfg: id 1, flag<br/>
                        R2(config)#access-list 1 permit 192.168.1.0 0.0.0.255<br/>
                        R2(config)#ip nat pool nju 200.1.1.253 200.1.1.254 p 24<br/>
                        R2(config)#ip nat inside source list 1 pool nju<br/>
                        R2(config)#<br/>
                        *Oct 27 09:19:45.703: ipnat_add_dynamic_cfg_common: id 1, flag 5, range 1<br/>
                        *Oct 27 09:19:45.707: id 1, flags 0, domain 0, lookup 0, aclnum 1, aclname1,mapn<br/>
                        ame idb 0x00000000<br/>
                        *Oct 27 09:19:45.707: poolstart 200.1.1.253 poolend 200.1.1.254<br/>
                        R2(config)#<br/>
                    </blockquote>
                </Paragraph>

                <Paragraph>
                    &ensp;&ensp;4. 用192.168.1.1 ping 200.1.1.2
                </Paragraph>
                <Paragraph>
                    <blockquote>
                        R1#ping<br/>
                        Protocol [ip]:<br/>
                        Target IP address: 200.1.1.2<br/>
                        Repeat count [5]: 50<br/>
                        Datagram size [100]:<br/>
                        Timeout in seconds [2]:<br/>
                        Extended commands [n]:<br/>
                        Sweep range of sizes [n]:<br/>
                        Type escape sequence to abort.<br/>
                        Sending 50, 100-byte ICMP Echos to 200.1.1.2, timeout is 2 seconds:<br/>
                        !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!<br/>
                        Success rate is 100 percent (50/50), round-trip min/avg/max = 40/43/44 ms<br/>
                        R1#_<br/>
                    </blockquote>
                </Paragraph>
                <Paragraph>
                    &ensp;&ensp;Ping通说明路由添加正确，查看R2的终端信息。
                </Paragraph>
                <Paragraph>
                    <blockquote>
                        *Oct 27 09:20:54.591: NAT*: s=192.168.1.1->200.1.1.253, d=200.1.1.2 [60]<br/>
                        *Oct 27 09:20:54.619: NAT*: s=200.1.1.2, d=200.1.1.253->192.168.1.1 [60]<br/>
                    </blockquote>
                </Paragraph>

                <Paragraph>
                    &ensp;&ensp;5. 在R1上用192.168.1.3 ping 200.1.1.2
                </Paragraph>
                <Paragraph>
                    <blockquote>
                        R1#ping<br/>
                        Protocol [ip]:<br/>
                        Target IP address: 200.1.1.2<br/>
                        Repeat count [5]: 20<br/>
                        Datagram size [100]:<br/>
                        Timeout in seconds [2]:<br/>
                        Extended commands [n]: y<br/>
                        Source address or interface: 192.168.1.3<br/>
                        Type of service [0]:<br/>
                        Set DF bit in IP header? [no]:<br/>
                        Validate reply data? [no]:<br/>
                        Data pattern [0xABCD]:<br/>
                        Loose, Strict, Record, Timestamp, Verbose[none]:<br/>
                        Sweep range of sizes [n]:<br/>
                        Type escape sequence to abort.<br/>
                        Sending 20, 100-byte ICMP Echos to 200.1.1.2, timeout is 2 seconds:<br/>
                        Packet sent with a source address of 192.168.1.3<br/>
                        !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!<br/>
                        Success rate is 100 percent (20/20), round-trip min/avg/max = 40/43/44 ms<br/>
                        R1#_<br/>
                    </blockquote>
                </Paragraph>
                <Paragraph>
                    &ensp;&ensp;查看R2的终端信息以及NAT转换表，源地址192.168.1.2转换成200.1.1.254，很明显
                    调用了第2公有地址。
                </Paragraph>

                <Paragraph>
                    <blockquote>
                        *Oct 27 09:26:10.339: NAT*: s=192.168.1.3->200.1.1.254, d=200.1.1.2 [139]<br/>
                        *Oct 27 09:26:10.367: NAT*: s=200.1.1.2, d=200.1.1.254->192.168.1.3 [139]<br/>
                    </blockquote>
                </Paragraph>
                <Paragraph>
                    <blockquote>
                        R2#show ip nat translations<br/>
                        Pro Inside global Inside local Outside local Outside global<br/>
                        --- 200.1.1.253 192.168.1.1 --- ---<br/>
                        --- 200.1.1.254 192.168.1.3 --- ---<br/>
                        R2#_<br/>
                    </blockquote>
                </Paragraph>
                <Paragraph>
                    &ensp;&ensp;6. 在R1上用192.168.1.4 ping 200.1.1.2
                </Paragraph>
                <Paragraph>
                    <blockquote>
                        R1#ping<br/>
                        Protocol [ip]:<br/>
                        Target IP address: 200.1.1.2<br/>
                        Repeat count [5]: 20<br/>
                        Datagram size [100]:<br/>
                        Timeout in seconds [2]:<br/>
                        Extended commands [n]: y<br/>
                        Source address or interface: 192.168.1.4<br/>
                        Type of service [0]:<br/>
                        Set DF bit in IP header? [no]:<br/>
                        Validate reply data? [no]:<br/>
                        Data pattern [0xABCD]:<br/>
                        Loose, Strict, Record, Timestamp, Verbose[none]:<br/>
                        Sweep range of sizes [n]:<br/>
                        Type escape sequence to abort.<br/>
                        Sending 20, 100-byte ICMP Echos to 200.1.1.2, timeout is 2 seconds:<br/>
                        Packet sent with a source address of 192.168.1.4<br/>
                        ……………………………...<br/>
                        Success rate is 0 percent (0/20)<br/>
                        R1#_<br/>
                    </blockquote>
                </Paragraph>
                <Paragraph>
                    &ensp;&ensp;结果发现不能 ping 通到目的。查看 R2 的 NAT 转换表，发现没有 192.168.1.4 的条
                    目。
                </Paragraph>
                <Paragraph>
                    <blockquote>
                        R2#show ip nat translations<br/>
                        Pro Inside global Inside local Outside local Outside global<br/>
                        --- 200.1.1.253 192.168.1.1 --- ---<br/>
                        --- 200.1.1.254 192.168.1.3 --- ---<br/>
                        R2#_<br/>
                    </blockquote>
                </Paragraph>
                <Paragraph>
                    &ensp;&ensp;解决的方法：清除 R2 的 NAT 表中的条目，将公有地址池中的公有地址释放出来。
                </Paragraph>
                <Paragraph>
                    <blockquote>
                        R2#clear ip nat translation *<br/>
                        R2#show ip nat translations<br/>
                        R2#_<br/>
                    </blockquote>
                </Paragraph>

                <Paragraph>
                    在R1上重试。
                </Paragraph>
                <Paragraph>
                    <blockquote>
                        R1#ping<br/>
                        Protocol [ip]:<br/>
                        Target IP address: 200.1.1.2<br/>
                        Repeat count [5]:<br/>
                        Datagram size [100]:<br/>
                        Timeout in seconds [2]:<br/>
                        Extended commands [n]: y<br/>
                        Source address or interface: 192.168.1.4<br/>
                        Type of service [0]:<br/>
                        Set DF bit in IP header? [no]:<br/>
                        Validate reply data? [no]:<br/>
                        Data pattern [0xABCD]:<br/>
                        Loose, Strict, Record, Timestamp, Verbose[none]:<br/>
                        Sweep range of sizes [n]:<br/>
                        Type escape sequence to abort.<br/>
                        Sending 20, 100-byte ICMP Echos to 200.1.1.2, timeout is 2 seconds:<br/>
                        Packet sent with a source address of 192.168.1.4<br/>
                        !!!!!!!!!!!<br/>
                        Success rate is 100 percent (5/5), round-trip min/avg/max = 44/44/44 ms<br/>
                        R1#_<br/>
                    </blockquote>
                </Paragraph>
                <Paragraph>
                    &ensp;&ensp;R2 终端上所显示的转换过程。
                </Paragraph>
                <Paragraph>
                    <blockquote>
                        *Oct 27 09:37:24.699: NAT*: s=192.168.1.4->200.1.1.253, d=200.1.1.2 [170]<br/>
                        *Oct 27 09:37:24.727: NAT*: s=200.1.1.2, d=200.1.1.253->192.168.1.4 [170]<br/>
                    </blockquote>
                </Paragraph>
                <Paragraph>
                    &ensp;&ensp;再查看R2的NAT转换表。
                </Paragraph>
                <Paragraph>
                    <blockquote>
                        R2#show ip nat translations<br/>
                        Pro Inside global Inside local Outside local Outside global<br/>
                        icmp 200.1.1.253:7 192.168.1.4:7 200.1.1.2:7 200.1.1.2:7<br/>
                        --- 200.1.1.253 192.168.1.4 --- ---<br/>
                        R2#_<br/>
                    </blockquote>
                </Paragraph>
                <Paragraph>
                    &ensp;&ensp;7. 配置 PAT<br/>
                    &ensp;&ensp;先删除转换语句，再删除之前建立的 pool，注意删除的顺序。<br/>
                </Paragraph>
                <Paragraph>
                    <blockquote>
                        R2(config)#no ip nat inside source list 1 pool nju<br/>
                        Dynamic mapping in use, do you want to delete all entires? [no]: yes<br/>
                        R2(config)#no ip nat pool nju 200.1.1.253 200.1.1.254 prefix-length 24<br/>
                        R2(config)#ip nat pool nju 200.1.1.253 200.1.1.253 prefix-length 24<br/>
                        R2(config)#ip nat inside source list 1 pool nju overload<br/>
                        R2(config)#<br/>
                        *Oct 27 09:42:38.571: ipnat_add_dynamic_cfg_common: id 2,flag 5, range 1<br/>
                        *Oct 27 09:42:38.571: id 2, flags 0, domain 0, lookup 0, aclnum 1, aclname 1, map<br/>
                        name idb 0x00000000<br/>
                        *Oct 27 09:42:38.571: poolstart 200.1.1.253 poolend 200.1.1.253 _<br/>
                    </blockquote>
                </Paragraph>
                <Paragraph>
                    &ensp;&ensp;8. 在 R1 用 192.168.1.1 上 ping 200.1.1.2
                </Paragraph>
                <Paragraph>
                    <blockquote>
                        R1#ping 200.1.1.2<br/>
                        Type escape sequence to abort.<br/>
                        Sending 5, 100-byte ICMP Echos to 200.1.1.2, timeout is 2 seconds:<br/>
                        !!!!!<br/>
                        Success rate is 100 percent (5/5), round-trip min/avg/max =44/44/44 ms<br/>
                        R1#_<br/>
                    </blockquote>
                </Paragraph>
                <Paragraph>
                    &ensp;&ensp;查看 R2 的终端信息以及 NAT 转换表，随机产生端口号 6。
                </Paragraph>
                <Paragraph>
                    <blockquote>
                        *Oct 27 09:44:05.283: NAT*: s=192.168.1.1->200.1.1.253, d=200.1.1.2 [175]<br/>
                        *Oct 27 09:44:05.311: NAT*: s=200.1.1.2, d=200.1.1.253->192.168.1.1 [175]<br/>
                    </blockquote>
                </Paragraph>
                <Paragraph>
                    <blockquote>
                        R2#show ip nat translations<br/>
                        Pro Inside global Inside local Outside local Outside global<br/>
                        icmp 200.1.1.253:6 192.168.1.1:6 200.1.1.2:6 200.1.1.2:6<br/>
                        R2#_<br/>
                    </blockquote>
                </Paragraph>
                <Paragraph>
                    &ensp;&ensp;R2 约 1 分钟的时间释放地址转换的空间，此时查找 NAT 表中没有任何的转换条目。
                </Paragraph>
                <Paragraph>
                    <blockquote>
                        R2#show ip nat translations<br/>
                        R2#_<br/>
                    </blockquote>
                </Paragraph>
                <Paragraph>
                    &ensp;&ensp;9. 在 R1 用 192.168.1.3 ping 200.1.1.2
                </Paragraph>
                <Paragraph>
                    <blockquote>
                        R1#ping<br/>
                        Protocol [ip]:<br/>
                        Target IP address: 200.1.1.2<br/>
                        Repeat count [5]:<br/>
                        Datagram size [100]:<br/>
                        Timeout in seconds [2]:<br/>
                        Extended commands [n]: y<br/>
                        Source address or interface: 192.168.1.3<br/>
                        Type of service [0]:<br/>
                        Set DF bit in IP header? [no]:<br/>
                        Validate reply data? [no]:<br/>
                        Data pattern [0xABCD]:<br/>
                        Loose, Strict, Record, Timestamp, Verbose[none]:<br/>
                        Sweep range of sizes [n]:<br/>
                        Type escape sequence to abort.<br/>
                        Sending 20, 100-byte ICMP Echos to 200.1.1.2, timeout is 2 seconds:<br/>
                        Packet sent with a source address of 192.168.1.3<br/>
                        ……………………………...<br/>
                        Success rate is 0 percent (5/5), round-trip min/avg/max = 40/43/44 ms<br/>
                        R1#_<br/>
                    </blockquote>
                </Paragraph>
                <Paragraph>
                    &ensp;&ensp;查看 R2 的终端信息。
                </Paragraph>
                <Paragraph>
                    <blockquote>
                        *Oct 27 09:47:40.827: NAT*: s=192.168.1.1->200.1.1.253, d=200.1.1.2 [180]<br/>
                        *Oct 27 09:47:40.855: NAT*: s=200.1.1.2, d=200.1.1.253->192.168.1.3 [180]<br/>
                    </blockquote>
                </Paragraph>
                <Paragraph>
                    &ensp;&ensp;端口号已改为 9。
                </Paragraph>
                <Paragraph>
                    <blockquote>
                        R2#show ip nat translations<br/>
                        Pro Inside global Inside local Outside local Outside global<br/>
                        icmp 200.1.1.253:9 192.168.1.1:9 200.1.1.2:9 200.1.1.2:9<br/>
                        R2#<br/>
                        *Oct 27 09:48:41.467: NAT: expiring 200.1.1.253(192.168.1.3) icmp 9 (9)<br/>
                        R2#<br/>
                    </blockquote>
                </Paragraph>
            </Panel>
            <Panel header={'实验命令列表'} key={'command'}>
                <Table dataSource={data} columns={columns} />
            </Panel>
            <Panel header={'实验问题'} key={'problem'}>
            </Panel>
        </Collapse>
    );
}

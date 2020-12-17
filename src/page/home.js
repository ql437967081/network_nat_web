import React from 'react';
import { Card, Space, Typography } from 'antd';
import { withRouter } from 'react-router-dom';

const { Link } = Typography;

function Home({ history }) {
    const routers = [
        { hostname: 'R1', ip_address: '172.16.0.2', netmask: '/16' },
        { hostname: 'R2', ip_address: '172.16.0.3', netmask: '/16' },
        { hostname: 'R3', ip_address: '172.16.0.4', netmask: '/16' },
    ];

    const telnet = index => {
        const { hostname, ip_address } = routers[index];
        console.log(`连接${ip_address}`);
        history.push(`/router_${hostname}`);
    };

    return (
        <Space direction={'vertical'}>
            {routers.map(({ hostname, ip_address, netmask }, index) => (
                <Card
                    key={ip_address}
                    title={hostname}
                    extra={
                        <Link
                            key={`link-${hostname}`}
                            onClick={() => telnet(index)}
                        >
                            连接
                        </Link>
                    }
                    style={{ width: '100%' }}
                >
                    IP地址：{ip_address}{netmask}
                </Card>
            ))}
        </Space>
    );
}

export default withRouter(Home);

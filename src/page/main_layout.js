import React, { useState } from 'react';
import { Button, Col, Layout, Row, Space, Typography } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import ExperimentDetail from './experiment_detail';

const { Header, Footer, Content, Sider } = Layout;

const { Title } = Typography;

export default function MainLayout({ children }) {
    const [collapsed, setCollapsed] = useState(false);

    const toggle = () => setCollapsed(!collapsed);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header>
                <Space direction={'vertical'} style={{ width: '100%' }}>
                    <Row justify="space-between" align="middle">
                        <Col>
                            <Title level={3} style={{ color: 'white' }}>
                                实验：NAT网络地址转换
                            </Title>
                        </Col>
                        <Col>
                            <Button
                                onClick={toggle}
                                icon={collapsed ? <MenuFoldOutlined/> : <MenuUnfoldOutlined/>}
                            >
                                {collapsed ? '实验详情' : '隐藏实验'}
                            </Button>
                        </Col>
                    </Row>
                </Space>
            </Header>
            <Layout>
                <Content style={{ padding: '24px', marginRight: 500 }}>
                    {children}
                </Content>
                <Sider
                    style={{ backgroundColor: 'white', position: 'fixed', right: 0, overflow: 'auto', height: '80vh' }}
                    width={500}
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                >
                    <ExperimentDetail />
                </Sider>
            </Layout>
            <Footer style={{ textAlign: 'center' }}>
                版权所有：南京大学2020高级计算机网络 第21组
            </Footer>
        </Layout>
    );
}

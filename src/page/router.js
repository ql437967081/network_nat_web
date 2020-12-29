import React from 'react';
import { Button, Card, Collapse, message, Spin } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import BasicForm from './form/basic_form';
import InterfaceForm from './form/interface_form';
import { setConnection, exitConnection } from '../sessionConfig';
import StaticRoute from './panel/static_route';
import StaticNAT from './panel/static_nat';
import AccessList from './panel/access_list';
import DynamicNAT from './panel/dynamic_nat';
import PAT from './panel/pat';
import Ping from './panel/ping';
import ShowNAtList from "./panel/show_nat_list";
import { backendModeConfig } from '../api/util/default';
import { telnet, exit } from '../api/telnet_api';

const { Panel } = Collapse;

class Router extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            interfaces: [
                {
                    name: 'FastEthernet0/0',
                    abbr: 'f0/0',
                    disabled: true
                },
                {
                    name: 'FastEthernet0/1',
                    abbr: 'f0/1'
                },
                {
                    name: 'Serial0/0/0',
                    abbr: 's0/0/0'
                },
                {
                    name: 'Serial0/0/1',
                    abbr: 's0/0/1'
                }
            ],
            loading: false
        };
    }

    logout = () => {
        this.props.history.push('/home');
    };

    getRouterId = () => {
        const { router_id } = this.props.match.params;
        return router_id;
    };

    componentDidMount() {
        const router_id = this.getRouterId();
        console.log(`连接R${router_id}。。。`);
        console.log('获取路由器信息。。。');
        if (backendModeConfig) {
            this.setState({ loading: true, spinTip: '路由器连接中。。。' });
            telnet(router_id, connectionId => {
                setConnection(router_id, connectionId);
                this.setState({ loading: false });
            });
        } else {
            setConnection(router_id, 'c1');
        }
        console.log(`router_id: ${router_id}`);
    }

    componentWillUnmount() {
        const router_id = this.getRouterId();
        console.log(`断开连接R${router_id}。。。`);
        if (backendModeConfig) {
            exit(s => {
                exitConnection();
                message.success('路由器连接已断开');
            });
        } else {
            exitConnection();
        }
    }

    render() {
        const { interfaces, loading, spinTip } = this.state;
        const routerId = parseInt(this.getRouterId());
        return (
            <Spin size={'large'} tip={spinTip} spinning={loading}>
                <Card
                    title={'路由器信息'}
                    extra={
                        <Button
                            danger
                            icon={<LogoutOutlined />}
                            onClick={this.logout}
                        >
                            断开连接
                        </Button>
                    }
                >
                    {!loading && (
                        <Collapse defaultActiveKey={'basic'}>
                            <Panel key={'basic'} header={'基本配置'} collapsible={'disabled'}>
                                <BasicForm />
                            </Panel>
                            <Panel key={'interface'} header={'接口配置'}>
                                <Collapse>
                                    {interfaces.map(({ name, abbr, disabled }) => {
                                        const disabledText = disabled ? '（不可配置）' : '';
                                        const inputProps = {};
                                        if (disabled) inputProps['disabled'] = true;
                                        return (
                                            <Panel
                                                key={`int-${abbr}`}
                                                header={`${name} (${abbr})${disabledText}`}
                                            >
                                                <InterfaceForm abbr={abbr} {...inputProps} />
                                            </Panel>
                                        );
                                    })}
                                </Collapse>
                            </Panel>
                            {routerId === 1 && (
                                <Panel key={'static_route'} header={'静态路由'}>
                                    <StaticRoute />
                                </Panel>
                            )}
                            {routerId === 2 && [
                                <Panel key={'static_nat'} header={'静态NAT'}>
                                    <StaticNAT />
                                </Panel>,
                                <Panel key={'access_list'} header={'用户访问控制列表'}>
                                    <AccessList />
                                </Panel>,
                                <Panel key={'dynamic_nat'} header={'动态NAT'}>
                                    <DynamicNAT />
                                </Panel>,
                                <Panel key={'pat'} header={'PAT'}>
                                    <PAT />
                                </Panel>
                            ]}
                            <Panel key={'show_nat_list'} header={'查看NAT转换表'}>
                                <ShowNAtList/>
                            </Panel>
                            <Panel key={'ping'} header={'Ping'}>
                                <Ping />
                            </Panel>
                        </Collapse>
                    )}
                </Card>
            </Spin>
        );
    }
}

export default withRouter(Router);

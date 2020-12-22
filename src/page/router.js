import React from 'react';
import { Button, Card, Collapse } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import BasicForm from './form/basic_form';
import InterfaceForm from './form/interface_form';

const { Panel } = Collapse;

class Router extends React.Component{
    constructor(props) {
        super(props);
        const { router_id } = props.match.params;
        this.state = {
            router_id,
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
            ]
        };
    }

    logout = () => {
        this.props.history.push('/home');
    };

    componentDidMount() {
        const { router_id } = this.state;
        console.log(`连接R${router_id}。。。`);
        console.log('获取路由器信息。。。');
        sessionStorage.setItem('connectionId', 'c1');
        console.log(`router_id: ${router_id}`);
    }

    componentWillUnmount() {
        const { router_id } = this.state;
        console.log(`断开连接R${router_id}。。。`);
        sessionStorage.removeItem('connectionId');
    }

    render() {
        const { interfaces } = this.state;
        return (
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
                </Collapse>
            </Card>
        );
    }
}

export default withRouter(Router);
